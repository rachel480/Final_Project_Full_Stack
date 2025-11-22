const SortSelect = ({ sortBy, setSortBy, options }) => {

    const handleSort = (e) => {
        setSortBy(e.target.value)
    }

    return (
        <select
            value={sortBy}
            onChange={handleSort}
            className={`
                border border-gray-300 rounded-md
                px-4 py-2
                text-base text-gray-700 font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-400
                transition-colors duration-200
                max-md:text-sm max-md:px-2 max-md:py-1
            `}
        >
            <option disabled value="sort by">Sort by</option>
            <option value="none">None</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    )
}

export default SortSelect;
