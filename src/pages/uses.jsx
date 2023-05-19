import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Alexander Keliris</title>
        <meta
          name="description"
          content="Software I use, programming languages I love, and other things I recommend."
        />
      </Head>
      <SimpleLayout
        title="Software I use, programming languages I love, and other things I recommend."
        intro="I get asked a lot about the things I use to build software and stay productive. Here’s a big list of all of my favorite stuff."
      >
        <div className="space-y-20">
          <ToolsSection title="Programming Languages">
            <Tool title="Rust">
              Rust is my favourite programming language thanks to it’s powerful
              type system and modern tooling. It feels amazing when you get your
              code to successfully compile and know that it will run with a high
              degree of safety. And the you get unparalled runtime performance
              🚀.
            </Tool>
            <Tool title="Typescript">
              I’ve spent most of my career in the Typescript/Javascript/Node.js
              ecosystem. Despite having my frustrations with Typescript, it is
              an excellent upgrade to vanilla Javascript and I’ve used it
              extensively.
            </Tool>
            <Tool title="Go">
              Go is a great choice for backend web servers. Can be very
              productive and you get a nice fast binary at the end. It can get a
              little frustrating when you think like a Rust developer (no
              enums!) but I would take a Go project over a Node.js project.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Workstation">
            <Tool title="15” MacBook Pro (2019)">
              This is an Intel-based MacBook Pro, and has served me well over
              the years. Ready to upgrade to the new Apple Silicon though!
            </Tool>
            <Tool title="Custom-built PC (Windows & WSL)">
              This PC is my workhorse. Although the host OS is Windows, I mostly
              stay in WSL, which is fantastic. WSL lets me keep my hard-won unix
              knowledge from my years on macOS. I should probably just install a
              linux distro directly, but Windows has it’s conveniences for
              non-dev tasks.
            </Tool>
            <Tool title="Custom-built Keyboards">
              I regularly use two custom-built keyboards. One is an ortholinear
              split keyboard and the other is a plank-style 40% board. Both have
              small form factors, which means I am always a one key distance
              away from whatever I need to type, but has the tradeoff of needing
              to remember many custom combinations and layers. Both keyboards
              are configured using QMK.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="Neovim">
              When I just want to focus and code, nothing beats Neovim. I have
              been using Neovim has my primary editor for around 5 years and
              love it. Vim is well known for efficiency and speed, and my flow
              state is best achived when coding in nvim.
            </Tool>
            <Tool title="JetBrains">
              Along side Neovim, I use IntelliJ IDEA Ultimate (with vim bindings
              enabled). Despite configuring nvim to have an IDE grade feature
              set, the JetBrains IDEs are best-in-class for intellisense,
              refactoring and debugging. When I need to do big refactors, like
              moving files/folders or use the debugger, I always reach for
              Intellij.
            </Tool>
            <Tool title="kitty">
              On my Macbook, I use Kitty. It’s is a very fast terminal emulator
              that supports ligatures, so my nvim setup is still aesthetic.
            </Tool>
            <Tool title="Windows Terminal">
              On my Windows PC, I use the Windows Terminal. Pleasantly suprised
              how good this terminal emulator is. Easily customisable, very
              fast, and is my gatewaty to WSL.
            </Tool>
            <Tool title="Zellij">
              I use Zellij for my terminal workspace. I used tmux for years, but
              Zellij comes configured how I like out-of-the-box.
            </Tool>
            <Tool title="LazyVim">
              I built up a large vim config over the years, but got fatigued
              maintaining it. Intellij was a dream to use as it hardly needs any
              configuration, so I started to get jaded with my vim config. But
              then I discovered LazyVim, which transforms Neovim into a
              full-fledged IDE with hardly any effort from me. I’ve tried other
              vim config systems before, but this hits the sweet spot as it’s
              super fast and easy to customize and extend.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
