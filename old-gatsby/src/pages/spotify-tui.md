---
title: 'Spotify for the terminal written in Rust'
date: '2019-10-15'
isHiddenFromPosts: false
---

![](https://user-images.githubusercontent.com/12150276/64545371-84af3580-d320-11e9-867d-c368fd888b3b.gif)

Over the past couple of months I've been working on [spotify-tui](https://github.com/Rigellute/spotify-tui) - a Spotify terminal user interface.

As an avid terminal/tmux/vim user, I get frustrated when I need to leave the terminal to use certain applications. At this point, it's almost painful that I need take my hands off of the keyboard and use the mouse.

I'm also a user of Spotify, so it's natural to me that Spotify is controllable from within the terminal.

Some projects building a tui for Spotify already exist. But I took this as an opportunity to get better with the [Rust](https://www.rust-lang.org/) programming language. As well as get more experience building advanced terminal applications.

## The Dream

I've had tremendous amounts of fun working on this project.

Working with Rust has been dreamy. I built a large part of this app whilst offline during the evenings of a recent holiday. I was guided by the strong types and compiler checks. When I then had the opportunity to go online, everything "Just Worked".

Coming from a Javascript background, this developer experience is the dream.

## Fast

Then of course, because I'm using Rust, there is the speed that you get out of the box.

As of writing, I've made no optimisations to speak of. And I've probably implemented things in an inefficient manor. But so far the speed of the app has been excellent!

## Lightweight

Compared to the official client app from Spotify, `spotify-tui` runs with low memory usage.

I've observed the official client using 200-400MB.

Whereas `spotify-tui` runs in the 2-4MB range!

Literally 100X less resource usage.

## Limitations

As I've noted in the [README](https://github.com/Rigellute/spotify-tui#limitations), there are some limitations.

This app uses the [Web API](https://developer.spotify.com/documentation/web-api/) from Spotify, meaning that `spotify-tui` doesn't handle streaming itself.

You can think of `spotify-tui` as more of a "controller" or "frontend" to Spotify. With this setup, `spotify-tui` can control all your Spotify devices.

To control playback, you need to do two things

1. Check that you have a Spotify Premium account.
1. You'll need either an official Spotify client open or a lighter weight alternative such as [spotifyd](https://github.com/Spotifyd/spotifyd).

I recommend `spotifyd` to keep things light.

## Community Response

I announced the release of `spotify-tui` on Reddit and Hacker News on 7th October, and the response has been amazing.

It's incredibly satisfying seeing something you've worked on get recognition - within one day the project hit 1K stars on Github.

I'd also like to thank all the contributors who jumped in early fixing issues and adding features. It's been wonderful so far, and long may it continue!

## Bugs & Suggestions

If something isn't working or you have a feature you'd like to request, please open an issue on the [`spotify-tui` GitHub page](https://developer.spotify.com/documentation/web-api/)
