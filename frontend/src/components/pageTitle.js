import { Typography } from "@mui/material";

const PageTitle = ({ text, size = "h4", align = "center" }) => {
  return (
    <Typography
      variant={size}
      align={align}
      className="font-bold tracking-wide mb-6"
      sx={{
        color: "rgba(229,145,42,0.9)",
        textShadow: "0 1px 2px rgba(0,0,0,0.1)",
      }}
    >
      {text}
    </Typography>
  );
};

export default PageTitle;
