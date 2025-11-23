import { useNavigate } from "react-router-dom"

const NavigateButton = ({ navigation, buttonText }) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(navigation)}
      className="px-4 py-2 rounded-md bg-orange-400 text-white font-bold max-md:px-3 max-md:py-1 max-md:text-sm"
    >
      {buttonText}
    </button>
  )
}

export default NavigateButton