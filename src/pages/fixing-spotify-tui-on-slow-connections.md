---
title: 'Fixing spotify-tui on slow connections'
date: '2020-03-06'
---

In [spotify-tui](https://github.com/Rigellute/spotify-tui) versions 0.15.0 and prior there was a major issue that caused the UI to freeze and not respond to user key events.

This post attempts to outline the problem and the solution.

## Architecture

The architecture of `spotify-tui` is one big loop that draws to the terminal, receives new key events and performs network calls.

The "freezing" behaviour lies somewhere in here.

## Rendering loop

There are plenty of loops and data transformations happening on each loop but nothing so serious to clog up the CPU. So unlikely that the rendering loop is causing this "freezing" problem.

## User key events

These events are emitted from their own thread and won't block the main UI rendering loop. So, again, the "freezing" problem was unlikely to be here.

## Blocking network requests

So the cause of the "freezing" behaviour is now obvious - the network calls to the Spotify API were blocking the main UI loop 😄.

When the internet connection is fast it's not noticeable, but this is a different story on bad connections.

## Solutions

I had thought of two main solutions to this:

1. Refactor the underlying Rust Spotify API wrapper [rspotify](https://github.com/ramsayleung/rspotify) to use the new `async/await` syntax and update `spotify-tui` to use the `tokio` async runtime (with prayers that this would magically solve the issue).
1. Within `spotify-tui`, use the main process to handle the UI rendering loop and implement a network thread to handle the network calls.

I new that the author of `rspotify` had plans to migrate to using `async/await` anyway so I started by [contributing](https://github.com/ramsayleung/rspotify/pull/82) to that effort.

## Fix #1 - No dice

After upgrading `spotify-tui` to the new `async/await` version of `rspotify` I simply kept the `spotify-tui` architecture as it was and followed the compiler errors telling me I needed to `await` the future.

Rather expectedly, using `async/await` alone changed nothing with regards to the main "freezing" issue.

Even with an `async` runtime, we were still `await`ing within the main rendering loop and so pausing execution until the future was resolved.

Thus, it was time to work on solution 2 from above.

## Fix #2 - Major architectural change

Now we need to spawn a new thread that can receive messages to perform network calls, thereby not blocking the rendering loop. We also need a way of sharing state between these threads.

The Rust book has an excellent section on [shared-state concurrency](https://doc.rust-lang.org/book/ch16-03-shared-state.html). To safely share read data in the UI thread and mutate it from the network thread, we must wrap the shared state within a [`Mutex`](https://doc.rust-lang.org/book/ch16-03-shared-state.html#sharing-a-mutext-between-multiple-threads).

And to share the `Mutex` across threads we must wrap it in a thread-safe reference-counting pointer [`Arc`](https://doc.rust-lang.org/std/sync/struct.Arc.html). You can also read more on atomic reference counting [here](https://doc.rust-lang.org/book/ch16-03-shared-state.html#atomic-reference-counting-with-arct).

Most of the state within `spotify-tui` is contained in the `App` struct.

So, in effect, I needed to do this

```rust
let app = Arc::new(Mutex::new(App::new()));
```

Now we can safely access `App` from the main process that implements the UI rendering loop, and from the network thread

```rust
let app = Arc::new(Mutex::new(App::new()));

// Clone the Arc so we can acquire a lock within the UI loop below
let cloned_app = Arc::clone(&app);
std::thread::spawn(move || {
  // Start a tokio async runtime in another thread and give it a
  // reference to the App (which is wrapped in Arc and Mutex).
  // We will explore what this is doing below
  start_tokio(&app);
});


loop {
  // Acquire a lock on the Mutex so we can access data contained in the app.
  let mut app = cloned_app.lock();

  terminal.draw(|| {
    // Draw the terminal UI and use data contained in app.
  });

  match events.next()? {
    // Match a key press event
  }

}
```

## Message passing

Since we receive user input from the main rendering loop (see `events.next()` above) we need a way to send a message to the network thread so it can perform the network action.

To do this, we create a [`channel`](https://doc.rust-lang.org/book/ch16-02-message-passing.html), pass the sending end into `App` and the receiving end into the network thread.

```rust
let (tx, rx) = std::sync::mpsc::channel();

let app = Arc::new(Mutex::new(App::new(tx)));

let cloned_app = Arc::clone(&app);
std::thread::spawn(move || {
// Send the receiving end of the channel into the network thread
  start_tokio(&app, rx);
});

loop {
  ...
}
```

Now we can receive messages in our network thread.

But what do we send from the UI loop? And how do we handle the message in the network thread?

## Enums

This is a perfect usecase for [`Enums`](https://doc.rust-lang.org/rust-by-example/custom_types/enum.html), which allows us to leverage the might of pattern matching.

```rust
pub enum IoEvent {
  GetCurrentPlayback,
  GetAlbum(String),
}

// Send a message to the network thread (this is synchronous)
tx.send(IoEvent::GetCurrentPlayback).unwrap();

```

And to receive the message we use the `recv` method on the `Receiver`. Now we can finally implement `start_tokio` method that is invoked in the thread above.

This function will attempt to receive a message, handle it via pattern matching, make async network requests, and update the app state.

```rust
// Receive a message and handle it
#[tokio::main]
async fn start_tokio(io_rx: std::sync::mpsc::Receiver<IoEvent>) {
  while let Ok(io_event) = io_rx.recv() {
    match io_event {
      IoEvent::GetCurrentPlayback => {
        // Make a network request and await it
        let current_playback = get_current_playback().await;

        // Acquire a lock on the App Mutex and mutate the state
        let mut app = app.lock();
        app.current_playback = current_playback;
      }

      IoEvent::GetAlbum(album_id) => {
        let album = get_album(album_id).await;

        let mut app = app.lock();
        app.current_album = album;
      }
    }
  }
}
```

## Conclusion

Refactoring both `rspotify` and `spotify-tui` to use `async/await` produced a huge number of changes.

On top of this, moving all Spotify API calls into the network thread was took a good deal of effort too.

Without `vim` macros this surely would have been a carapl tunnel inducing effort 😄.

### Learnings

- Rust `Futures`
- `async/await`
- `tokio` - the asynchronous runtime
- How to share state between threads using `Arc` and `Mutex`
- How to send data between threads using `channel`

### Gotchas

In the network thread, we must be careful to only acquire the `Mutex` lock after the network call is done (after the `await`), otherwise the lock we acquire in the UI loop will block that loop and so we'd be back to square one.

This could be hard to maintain and so perhaps I should investigate a different solution.

### Boilerplate

There is lots more boilerplate in this new architecture - now, all async tasks need to be added to the `IoEvent` enum so we can synchronously dispatch events from the UI thread and handle events in the network thread.

### UX

The user experience is much much better, however, as now the UI won't freeze when network calls are slow!

### Power of Rust 💪

As ever, Rust has made it much easier to handle rather tricky problems - async network calls and shared-state concurrency.

Given the scale of these changes, without the power of the compiler to guide me it would have been so much more difficult!

It was an amazing feeling following the compiler errors, fixing them, and then after about 4 hours of coding finally running `spotify-tui` for it to work as expected!

This is not to say that this change won't introduce new issues - we now need to think of loading states, navigating early before the network has responded etc.

These are familiar problems encountered in all (T)UI applications, and I look forward to solving them in `spotify-tui`!

### Suggestions

You might know a better architecture to the one outlined here, if so I'd leave to hear from you! Please tweet [@AlexKeliris](https://twitter.com/AlexKeliris) or open an issue on the [`spotify-tui`](https://github.com/Rigellute/spotify-tui).
