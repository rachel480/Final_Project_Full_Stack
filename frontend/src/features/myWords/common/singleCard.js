import { useState } from "react";
import { Card, CardContent, Box, Typography, Tooltip } from "@mui/material";

const SingleCard = ({title,subtitle,children,onClickTitle,updateButton,deleteButton,extraContent,width = "72",marginY = "4",}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Card
            className={`w-${width} mx-auto my-${marginY} cursor-pointer`}
            sx={{
                borderRadius: 3,
                background: hovered
                    ? "linear-gradient(to right, #ffd194, #ff7e5f)"
                    : "linear-gradient(to right, #fff59d, #ffeb3b)",
                color: "#333",
                textAlign: "center",
                padding: 2,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <CardContent className="flex flex-col items-center justify-center gap-2">
                {title && (
                    <Tooltip title={subtitle || ""} arrow>
                        <Box
                            onClick={onClickTitle}
                            className="cursor-pointer px-4 py-2 rounded-lg border-2 border-transparent hover:border-orange-500 transition-all duration-200 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 hover:from-orange-200 hover:via-orange-300 hover:to-orange-200"
                        >
                            <Typography
                                variant="h6"
                                className="font-bold text-gray-800 hover:text-white transition-colors duration-200"
                            >
                                {title}
                            </Typography>
                        </Box>
                    </Tooltip>
                )}

                {/* כפתורים */}
                {(updateButton || deleteButton) && (
                    <Box className="flex items-center justify-center gap-2 mt-2">
                        {updateButton}
                        {deleteButton}
                    </Box>
                )}

                {/* תוכן נוסף */}
                {extraContent}

                {/* ילדים נוספים */}
                {children}
            </CardContent>
        </Card>
    );
};

export default SingleCard;
