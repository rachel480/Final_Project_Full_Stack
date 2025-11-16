const CardRow = ({ children, className = "" }) => {
  return (
    <div className={`flex justify-between items-center p-3 border rounded-lg bg-gray-100 mt-2 ${className}`}>
      {children}
    </div>
  );
};

export default CardRow