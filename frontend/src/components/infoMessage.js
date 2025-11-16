import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const InfoMessage = ({ message = "אין נתונים להצגה" }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 text-gray-500">
      <InfoOutlinedIcon sx={{ fontSize: 40 }} />
      <p className="mt-3 text-lg font-medium">{message}</p>
    </div>
  )
}

export default InfoMessage