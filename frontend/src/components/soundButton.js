import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import speak from "../utils/speech";

const SoundButton = ({ word, title = "השמעה", className = "" }) => {

    const handleSpeak = () => speak(word)

    return (
        <Tooltip title={title}>
            <IconButton
                onClick={handleSpeak}
                className={`!bg-[rgba(0,150,255,1)] hover:!bg-[rgba(0,150,255,0.9)] text-white p-1 rounded ${className} w-[44px] h-[44px] max-md:w-[36px] max-md:h-[36px]`}
            >
                <VolumeUpIcon className="text-white !text-[24px] max-md:!text-[20px]" />
            </IconButton>
        </Tooltip>
    )
}

export default SoundButton