import { useState } from "react";

const ThemeSwitch = ({ theme, toggleTheme }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
    
      <div
        onClick={toggleTheme}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`
          w-14 h-7 rounded-full cursor-pointer flex items-center px-1
          transition-all duration-300
          ${theme === "light" ? "bg-gray-300" : "bg-black"}
        `}
      >
        <div
          className={`
            w-6 h-6 rounded-full bg-white shadow-md transform transition-all duration-300
            ${theme === "light" ? "translate-x-0" : "translate-x-7"}
          `}
        ></div>
      </div>
    </div>
  );
};

export default ThemeSwitch