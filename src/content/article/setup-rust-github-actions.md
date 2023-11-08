---
title: How to set up Rust in GitHub Actions
description: I like to set up CI for nearly all my side projects, here is how I set it up for Rust.
pubDate: '2023-11-08'
author: 'Alexander Keliris'
---

I have set up GitHub Actions for Rust in a number of ways over the years. My typical approach has been to use [actions/rs](https://github.com/actions-rs) (**which is now deprecated!**) to set up the Rust toolchain (`cargo` and `clippy`). I would also use [Swatinem/rust-cache](https://github.com/Swatinem/rust-cache) to improve CI times.

This is actually how [spotify-tui](https://github.com/Rigellute/spotify-tui) is [now set up](https://github.com/Rigellute/spotify-tui/blob/master/.github/workflows/ci.yml). It's fine, and still works, but of course I would prefer to use maintained actions and have a more integrated experience.

Luckily, the [moonrepo/setup-rust](https://github.com/moonrepo/setup-rust) truly is a one-stop-shop GitHub Action for setting up Rust and `cargo`, including caching.

Here is an example that runs the following:

- Formatting (`cargo fmt`).
- Linting (`cargo clippy`), running on Linux and Windows.
- Testing using [cargo-nextest](https://nexte.st/) and [cargo-make](https://sagiegurari.github.io/cargo-make/), running on Linux, macOS and Windows.
- And each step is automatically cached.

```yml
name: Rust

on:
  push:
    branches: ['main']
  pull_request:

jobs:
  format:
    name: Format
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: moonrepo/setup-rust@v1
        with:
          components: rustfmt
      - name: Check formatting
        run: cargo fmt --all --check
  lint:
    name: Lint
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
      fail-fast: false
    steps:
      - uses: actions/checkout@v3
      - uses: moonrepo/setup-rust@v1
        with:
          bins: cargo-make
          components: clippy
      - name: Run linter
        run: cargo make lint
  test:
    name: Test
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os:
          - ubuntu-latest
          - macos-latest
          - windows-latest
      fail-fast: false
    steps:
      - uses: actions/checkout@v3
      - uses: moonrepo/setup-rust@v1
        with:
          bins: cargo-make, cargo-nextest
      - name: Run tests
        run: cargo make test
```
