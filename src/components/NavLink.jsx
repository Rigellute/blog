export function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="inline-block py-1 px-2 text-slate-900 font-semibold text-sm lg:text-lg leading-6 dark:text-slate-50"
    >
      {children}
    </a>
  );
}
