const FormSelect = ({label,id,register,error,options = [],className = ""}) => {
  return (
    <div className={`flex flex-col gap-1 mt-4 ${className}`}>
        
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>

      <select
        id={id}
        {...register}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default FormSelect