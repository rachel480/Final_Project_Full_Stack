const SearchInput = ({ searchText, setSearchText, placeholder }) => {

    const handleSearch = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={searchText}
            onChange={(e) => handleSearch(e)}
            style={{
                width: "10vw",
                marginLeft:'45vw',
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