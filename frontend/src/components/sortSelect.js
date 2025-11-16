const SortSelect = ({ sortBy, setSortBy, options}) => {

    const handleSort = (e) => {
        setSortBy(e.target.value)
    }

    return (
        <select value={sortBy} onChange={(e) => handleSort(e)}>
            <option disabled={true} value={'sort by'}>sort by</option>
            <option value={'none'}>none</option>
            {
                options.map(option => (<option value={option}>{option}</option>))
            }
        </select>
    )
}

export default SortSelect