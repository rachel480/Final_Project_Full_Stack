const CardContainer = ({ children, className = "" }) => {
  return (
    <div
      className={`relative max-w-[45vw] mx-auto mt-8 p-6 bg-white/90 rounded-lg shadow-md font-sans ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContainer;