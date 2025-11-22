const TagLabel = ({text,className = ""}) => {
  return (
    <p
      className={`font-semibold px-4 py-2 max-md:px-3 max-md:py-1.5 rounded-lg border-[rgba(32,255,87,0.62)] text-cyan-900 ${className} border border-2 max-md:border-3 `}
    >
      {text}
    </p>
  )
}

export default TagLabel
