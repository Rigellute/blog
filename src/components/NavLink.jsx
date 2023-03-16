export function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="inline-block py-1 px-2 font-semibold text-sm lg:text-lg leading-6 text-slate-50"
    >
      {children}
    </a>
  );
}
