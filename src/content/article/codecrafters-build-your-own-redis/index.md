---
title: 'CodeCrafters: Build your own Redis'
description: 'My experience building my own in toy Redis implementation in Rust, following the CodeCrafters course.'
pubDate: '2023-03-23'
author: 'Alexander Keliris'
---

![Demo of redis implementation](./demo.gif)

Check out my [Source code](https://github.com/Rigellute/redis-rust) for details on how I implemented Redis in Rust.

## Build your own X

"Build your own X" is the motto of [CodeCrafters](https://app.codecrafters.io/courses/redis/overview). Building something yourself is an excellent way to explore new domains and programming languages.
CodeCrafters have recognised the power of this practice and have created a platform to guide users through the process.

I followed the "Build your own Redis" track and chose to use Rust, since it's my favourite programming language, and ended up learning so much!

Each step builds on the previous step, and is designed to not be overwhelming. This lets you bite off satisfying chunks in your extremely limited free time 😅.

For example, the first step asks you to set up a TCP server. You then learn how to encode and decode messages using the [Redis serialization protocol (RESP) specification](https://redis.io/topics/protocol#resp-simple-strings), and you keep building up features from there.

You complete each step by committing your changes to the CodeCrafters repo, which runs tests before accepting the push.

There is just enough guidance from CodeCrafters on what you need to complete each step. And then if you get really stuck, you can view solutions from other developers, as well as the official solution.

## ✨ Features

In the end, I implemented the following features:

- Parse the [Redis serialization protocol (RESP) specification](https://redis.io/docs/reference/protocol-spec/)
- Handle concurrent connections
- Implement commands:
  - `PING`
  - `ECHO`
  - `GET`
  - `SET` with optional expiry

I also added integration tests to cover all this functionality.

## 👨‍🎓 Learning

I already had a lot of experience using `tokio` for web servers. But I learnt how to implement the TCP "accept loop" and send each socket connection into the `tokio` scheduler, so the connection can be handled concurrently.

I learned how to wait for the client to send a message, read the stream of bytes into a buffer, and then write bytes back to the stream.

The part I enjoyed the most was writing a parser for the RESP messages. I decided to use [nom](https://docs.rs/nom-supreme/latest/nom_supreme/) and [nom_supreme](https://docs.rs/nom-supreme/latest/nom_supreme/), just to get more practice using parsing combinators as I'd like to use these libraries in my other projects.

I needed to implement the in-memory database itself. Rust makes this fairly straightforward thanks to its amazing `std` lib. The core data structure I chose is a `std::collections::HashMap` since Redis is a... key value store 😅. All that's needed to make the store thread safe is to wrap it in an `Arc<Mutex<...>`.

Finally, I implemented expiry using a background task. I realise my solution was inefficient, but it was enough to complete the challenge. Perhaps I'll return to this part to test my other ideas for a better implementation.

Check out my [Source code](https://github.com/Rigellute/redis-rust).

## Conclusion

I highly recommend anyone wishing to become a better software engineer to do a "build your own X "challenge!
