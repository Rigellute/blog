---
title: 'How to configure vim for VSCode users'
date: '2019-06-09'
isDraft: true
---

The goal of this post is to get new vim users coming from VSCode up and running as fast as possible with vim.

What features do we want (maybe even expect) from a modern text editor?

- Fuzzy search for files
- Syntax highlighting
- Autoclose for brackets, quotes, parentheses etc.
- Autocomplete
- Type level completion and information (think Typescript of Flow)
- Integrated Linting (think ESLint)
- Auto fix on save via a code formatter (think prettier)

The list could go on.

Vim can do all these things with very little config, but it can be hard to figure this out yourself (at least it took me a while).

The following guide to configuring vim has been tested by my colleagues wanting to start using vim. And I am pleased to say it has been a great success!

## First steps

Although I keep mentioning vim, we will actually be using neovim. So start downloading for your platform.

Note that I will use vim and nvim interchangeably for the rest of this post.

###### macOS

```bash
brew install neovim
```

You start neovim using `nvim`. If you want to open the current directory in neovim you use `nvim .`. Likewise, you can open a specific file with `nvim path/to/my/file.md`

You might be underwhelmed with what you get out of the box.

So let's start configuring!

#### Configuration

Your configuration file lives in `~/.config/nvim/init.vim`.

Of course, we will be using vim to edit our config :wink.

```bash
nvim ~/.config/nvim/init.vim
```

We probably want line numbers for the code we edit. So add the following line.

```vim
set number
```

After saving the file (`:w`), we need to reload vim to see the changes.

To do this, we can close vim and reopen. But I prefer to just `source` the `init.vim`

```vim
:source %
```

To reload vim from a another file

```vim
:source ~/.config/nvim/init.vim
```

This will become a very common workflow.

1. We make a change to our `init.vim`
1. Save the file
1. And reload either by closing and reopening or running `:source %`

#### Plugin time

Next, we need to install a plugin manager. I use [Plug](https://github.com/junegunn/vim-plug#neovim).

###### Unix

```sh
curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

###### Windows (PowerShell)

```powershell
md ~\AppData\Local\nvim\autoload
$uri = 'https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
(New-Object Net.WebClient).DownloadFile(
  $uri,
  $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath(
    "~\AppData\Local\nvim\autoload\plug.vim"
  )
)
```

For our first plugin, let's add a colour theme (this is just a fun and obvious way to see that things are working).

Add the following above the `set number`.

```vim
call plug#begin()

Plug 'Rigellute/rigel'

call plug#end()

" Enable the theme!
set termguicolors
syntax enable
colorscheme rigel
```

Now save and source the file. But wait nothing has happened!

Now we need to install the plugin. Which is done with:

```vim
:PlugInstall
```

Source the file again, and you should see the colour scheme.
