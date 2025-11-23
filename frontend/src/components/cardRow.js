const CardRow = ({ children, className = "" }) => {
  return (
    <div
      className={`
        flex justify-between items-center p-3 border rounded-lg 
        bg-gray-100 mt-2 
        ${className}
        max-md:flex-col max-md:items-center max-md:gap-2 max-md:p-2
      `}
    >
      {children}
    </div>
  )
}

export default CardRow