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
                className={`!bg-[rgba(0,150,255,1)] hover:!bg-[rgba(0,150,255,0.9)] text-white p-1 rounded ${className}`}
            >
                <VolumeUpIcon className="text-white" />
            </IconButton>
        </Tooltip>
    )
}

export default SoundButton