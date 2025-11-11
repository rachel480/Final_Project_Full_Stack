const TagLabel = ({text,className = ""}) => {
  return (
    <p
      className={`font-semibold px-4 py-2 rounded-lg border-[rgba(32,255,87,0.62)] text-cyan-900 ${className} border border-2`}
    >
      {text}
    </p>
  )
}

export default TagLabel
