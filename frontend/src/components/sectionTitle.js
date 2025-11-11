import { Typography } from "@mui/material";

const SectionTitle = ({ text, Icon }) => {
  return (
    <Typography
      variant="h5"
      className="flex items-center gap-2 font-bold text-2xl text-[rgba(229,145,42,0.9)]"
    >
      {Icon && <Icon className="text-[rgba(229,145,42,0.9)] text-3xl" />}
      {text}
    </Typography>
  );
};

export default SectionTitle;