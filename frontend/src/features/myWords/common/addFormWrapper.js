import { Box, Button, Typography } from "@mui/material";

const AddFormWrapper = ({ title, onSubmit, onCancel, isLoading = false, children }) => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0, left: 0,
                width: "100%", height: "100%",
                bgcolor: "rgba(0,0,0,0.2)",
                display: "flex", justifyContent: "center", alignItems: "center",
                zIndex: 1000
            }}
        >
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    maxWidth: 480,
                    p: 4,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #fef9c3, #d9f99d)",
                    boxShadow: 3,
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
                }}
            >
                <Typography variant="h5" fontWeight="bold" textAlign="center">{title}</Typography>

                {children}

                <Box display="flex" gap={1} mt={1}>
                    <Button type="submit" variant="contained" color="success" fullWidth disabled={isLoading}>Add</Button>
                    <Button type="button" variant="outlined" color="error" fullWidth disabled={isLoading} onClick={onCancel}>Cancel</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddFormWrapper
