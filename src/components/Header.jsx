import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Container } from "./Container";
import { NavLink } from "./NavLink";
import { Moon } from "./icons/Moon";
import { Sun } from "./icons/Sun";

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={"a"} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700 dark:stroke-slate-400"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50 dark:bg-slate-500/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white dark:bg-slate-900 p-4 text-lg tracking-tight text-slate-900 dark:text-slate-400 shadow-xl ring-1 ring-slate-900/5"
          >
            <MobileNavLink href="#features">Blog</MobileNavLink>
            <MobileNavLink href="#testimonials">Projects</MobileNavLink>
            <hr className="m-2 border-slate-300/40" />
            <MobileNavLink href="/login">Contact</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header({ title }) {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <a href="/" aria-label="Home">
              <p className="text-xl font-semibold text-slate-900 dark:text-sky-400 ">
                {title}
              </p>
            </a>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#features">Blog</NavLink>
              <NavLink href="#testimonials">Projects</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <NavLink href="/login">Contact</NavLink>
            </div>
            <button
              aria-label="Toggle between Dark and Light mode"
              data-aw-toggle-color-scheme
            >
              <Moon className="hidden dark:block fill-slate-400" />
              <Sun className="block dark:hidden fill-slate-600" />
            </button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
