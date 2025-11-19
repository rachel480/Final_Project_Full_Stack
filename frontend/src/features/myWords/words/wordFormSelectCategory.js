import ErrorMessage from "../../../components/errorMessage";
import LoadingSpinner from "../../../components/loadingSpinner";
import { useGetAllMyCategorisQuery } from "../categories/myCategoryApi";
import { FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";

const WordFormSelectCategory = ({ label, registerProps, error, placeholder, currentCategory }) => {
    const { data: categories = [], isLoading, error: categoryError } = useGetAllMyCategorisQuery();

    if (isLoading) return <LoadingSpinner />;
    if (categoryError) return <ErrorMessage message={categoryError?.data?.message || "משהו השתבש"} />;

    return (
        <FormControl
            fullWidth
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                mb: 2,
            }}
        >
            <InputLabel
                sx={{
                    fontWeight: "bold",
                    color: "#555",
                    mb: 0.5,
                    '&.Mui-focused': { color: "rgba(229,145,42,0.62)" }
                }}
            >
                {label}
            </InputLabel>

            <Select
                {...registerProps}
                defaultValue={currentCategory || ""}
                disabled={!!currentCategory}
                sx={{
                    background: "rgba(173, 216, 230, 0.2)",
                    borderRadius: 2,
                    paddingX: 1,
                    border: "2px solid rgba(229,145,42,0.62)",
                    '&:hover': { borderColor: "rgba(229,145,42,0.8)" },
                    '&.Mui-focused': { borderColor: "rgba(229,145,42,1)" },
                    "&.Mui-disabled": { color: "#333", background: "#f0f0f0" },
                }}
            >
                {!currentCategory && (
                    <MenuItem value="" disabled>
                        {placeholder}
                    </MenuItem>
                )}
                {categories.map((category) => (
                    <MenuItem key={category._id} value={category.name}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>

            {error && (
                <Typography variant="body2" sx={{ color: "red", mt: 0.5 }}>
                    {error}
                </Typography>
            )}
        </FormControl>
    )
}

export default WordFormSelectCategory;