import { Email, Phone } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="w-full py-3 mt-auto relative z-[60] bg-gradient-to-b from-gray-700 via-gray-800 to-black text-white">
      <div className="max-w-5xl mx-auto px-4 flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Phone fontSize="small" />
            <a
              href="tel:+972548535141"
              className="transition-transform transform hover:scale-105 hover:text-cyan-400 hover:underline duration-300"
            >
              053-4125480
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Email fontSize="small" />
            <a
              href="englishcity.app@gmail.com"
              className="transition-transform transform hover:scale-105 hover:text-cyan-400 hover:underline duration-300"
            >
              englishcity.app@gmail.com
            </a>
          </div>
        </div>

        <h3 className="text-lg font-semibold tracking-wide">
          נתקלתם בבעיה? דברו איתנו
        </h3>
      </div>
    </footer>
  )
}

export default Footer