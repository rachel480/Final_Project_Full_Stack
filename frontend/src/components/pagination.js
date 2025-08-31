const Pagination = ({ page, totalPages, setPage }) => {
    
    const handlePrevPage = () => {
        if (page - 1 >= 1)
            setPage(page - 1)
    }
    
    
    const handleNextPage = () => {
        if (page + 1 <= totalPages)
            setPage(page + 1)
    }
    return (
        <div>
            <button disabled={page <= 1} onClick={() => handlePrevPage()}>⬅️הקודם</button>
            <span>{page}</span>
            <button disabled={!totalPages || page >= totalPages} onClick={handleNextPage}>➡️ הבא</button>
        </div>
    )
}
export default Pagination