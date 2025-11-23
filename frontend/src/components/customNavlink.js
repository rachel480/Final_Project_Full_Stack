import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, children, className = "" }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        px-3 py-1 rounded transition-colors duration-200
        hover:bg-[rgba(144,144,144,0.1)]
        ${isActive ? "bg-[rgba(229,145,42,0.2)] text-[rgba(229,145,42,1)] font-bold" : ""}
        ${className}
        max-md:px-2 max-md:py-1 max-md:text-[18px]
      `}
    >
      {children}
    </NavLink>
  )
}

export default CustomNavLink