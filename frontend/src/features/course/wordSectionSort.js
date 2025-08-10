const WordSectionSort = ({ value, handleSort }) => {
    return (
        <div style={{ marginBottom: "16px" }}>
            <label>
                מיין לפי:{" "}
                <select value={value} onChange={(e) => handleSort(e.target.value)} defaultValue={'words'}>
                    <option value="words">מילים</option>
                    <option value="categories">קטגוריות</option>
                </select>
            </label>
        </div>
    )
}
export default WordSectionSort