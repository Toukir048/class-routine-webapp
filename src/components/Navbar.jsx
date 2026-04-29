import { NavLink } from "react-router";

export default function Navbar() {
  const links = (
    <>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/routine">Routine</NavItem>
      <NavItem to="/about">About</NavItem>
      <NavItem to="/contact">Contact</NavItem>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/80 px-4 shadow-md backdrop-blur-lg">
      <div className="navbar-start">
        <h1 className="text-xl font-black text-primary">ClassApp</h1>
      </div>

      <div className="navbar-end md:hidden">
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-ghost">
            ☰
          </button>

          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 w-52 rounded-2xl bg-base-100 p-2 shadow-xl"
          >
            {links}
          </ul>
        </div>
      </div>

      <div className="navbar-end hidden md:flex">
        <ul className="menu menu-horizontal gap-2">{links}</ul>
      </div>
    </div>
  );
}

function NavItem({ to, children }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `rounded-xl font-semibold transition-all duration-300 ${
            isActive
              ? "bg-primary text-primary-content shadow-md"
              : "hover:bg-primary/10 hover:text-primary"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}