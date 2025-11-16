import { Link } from "react-router-dom";

const CustomLink = ({ to, children, className = "", ...props }) => {
  return (
    <Link
      to={to}
      className={`text-[rgba(229,145,42,0.9)] underline hover:opacity-80 ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;