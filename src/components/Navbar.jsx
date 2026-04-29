import { NavLink } from "react-router";
import { FaHome, FaCalendarAlt, FaInfoCircle, FaPhoneAlt } from "react-icons/fa";
import { IoAlarmOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <>
      {/* Top Brand Bar */}
      <nav className="sticky top-0 z-50 bg-base-100/80 px-4 py-3 shadow-md backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-primary">ClassMate</h1>
            <p className="text-xs text-gray-500">Smart Routine App</p>
          </div>

          <div className="h-10 w-10 rounded-2xl bg-primary text-primary-content flex items-center justify-center font-black shadow-lg">
            <IoAlarmOutline />
          </div>
        </div>
      </nav>

      {/* Desktop Navbar */}
      <nav className="sticky top-0 z-50 hidden bg-base-100/80 px-8 py-3 shadow-md backdrop-blur-xl md:block">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-2xl font-black text-primary">ClassMate</h1>

          <div className="flex gap-3">
            <NavItem to="/" icon={<FaHome />} label="Home" />
            <NavItem to="/routine" icon={<FaCalendarAlt />} label="Routine" />
            <NavItem to="/about" icon={<FaInfoCircle />} label="About" />
            <NavItem to="/contact" icon={<FaPhoneAlt />} label="Contact" />
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-sm -translate-x-1/2 rounded-[2rem] border border-base-300 bg-base-100/90 px-3 py-2 shadow-2xl backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-4 gap-1">
          <MobileNavItem to="/" icon={<FaHome />} label="Home" />
          <MobileNavItem to="/routine" icon={<FaCalendarAlt />} label="Routine" />
          <MobileNavItem to="/about" icon={<FaInfoCircle />} label="About" />
          <MobileNavItem to="/contact" icon={<FaPhoneAlt />} label="Contact" />
        </div>
      </div>
    </>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-2xl px-4 py-2 font-bold transition-all duration-300 ${
          isActive
            ? "bg-primary text-primary-content shadow-lg shadow-primary/30"
            : "hover:bg-primary/10 hover:text-primary"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

function MobileNavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-xs font-bold transition-all duration-300 ${
          isActive
            ? "-translate-y-4 bg-primary text-primary-content shadow-xl shadow-primary/40"
            : "text-gray-500 hover:-translate-y-1 hover:text-primary"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span className="mt-1">{label}</span>
    </NavLink>
  );
}