import TextField from "@mui/material/TextField";

const SearchInput = ({ searchText, setSearchText, placeholder='🔎Search...'}) => {
  const handleSearch = (e) => setSearchText(e.target.value);

  return (
    <div className="w-full max-md:mt-2">
      <TextField
        placeholder={placeholder}
        value={searchText}
        onChange={handleSearch}
        fullWidth
        variant="outlined"
        inputProps={{
          style: { textAlign: "left", fontSize: 16 }, 
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 247, 217, 0.39)', 
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'rgba(229,145,42,0.62)',
              borderRadius: '12px',
            },
            '&:hover fieldset': { borderColor: 'rgba(229,145,42,0.8)' },
            '&.Mui-focused fieldset': { borderColor: 'rgba(229,145,42,1)' },
          },
          fontSize: { xs: '14px', md: '16px' } 
        }}
      />
    </div>
  );
};

export default SearchInput