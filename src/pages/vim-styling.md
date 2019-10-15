---
title: 'How to create a vim theme'
date: '2019-06-09'
isHiddenFromPosts: true
---

Starting a new colorscheme for Vim can be challenging.

You style certain attributes in a vim script:

```vim
hi ColorColumn guifg=#1E1E3F ctermfg=234 guibg=NONE ctermbg=NONE gui=NONE cterm=NONE
```

This is fairly straightforward but can be hard to manage as the styles grow - working with raw hex colour codes is nasty!

Luckily there is a very nice abstraction called [`estilo`](LINK), which generates the vim script based on a core "palette" of colours.

`estilo` nicely separates out syntax keywords relevant to different languages, in addition to starting out with set of keywords for base highlighting.

Once you're up and running with estilo.

```bash
mkdir new-vim-theme
cd new-vim-theme
estilo init
```

Work on your styles and run

```bash
estilo render
```

Now you want to see your styles. Quickest way I've found so far is to symlink the generated vim script into the `plugged` directory. Which for me is in `~/.config/nvim/plugged`.

```bash
ln -s ~/new-vim-theme ~/.config/nvim/plugged
```

Then in your `vimrc` or `~/.config/nvim/init.vim` pretend that the theme is already published
