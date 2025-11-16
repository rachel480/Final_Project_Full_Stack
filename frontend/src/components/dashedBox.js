const DashedBox = ({ children, className = "" }) => {
  return (
    <div
      className={`flex justify-between items-center mt-6 p-3 mb-2 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 ${className}`}
    >
      {children}
    </div>
  );
};

export default DashedBox;