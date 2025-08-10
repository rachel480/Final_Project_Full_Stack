const SearchInput=({value,handleSearch})=>{
     return (
        <input
            type="text"
            placeholder="Search word or translation..."
            value={value}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
                width: "100%",
                padding: "8px",
                marginBottom: "16px",
                fontSize: "16px",
                border: "1px solid black",
                borderRadius: "4px"
            }}
        />
    )
}
export default SearchInput