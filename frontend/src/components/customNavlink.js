import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, children, className = "" }) => {
  return (
    <NavLink
      to={to}
      className={`px-3 py-1 rounded hover:bg-[rgba(144,144,144,0.1)] transition-colors duration-200 ${className}`}
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
