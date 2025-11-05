import { useGetAllMyCategorysQuery } from "../categories/myCategoryApi"

const WordFormSelectCategory = ({ label, registerProps, error, placeholder, currentCategory }) => {
    const { data: categories, isLoading, error: categoryErroe } = useGetAllMyCategorysQuery()

    if (currentCategory) {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <label>{label}</label>
                <select {...registerProps} defaultValue={currentCategory} readOnly>
                    <option value={currentCategory}>{currentCategory}</option>
                </select>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        )
    }
    if (isLoading)
        return <p>loading categoies...</p>

    if (categoryErroe)
        return <p>{categoryErroe?.data?.message || "something went wrong"}</p>

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label>{label}</label>
            <select {...registerProps} defaultValue="">
                <option value="" disabled>{placeholder}</option>
                {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}
export default WordFormSelectCategory

