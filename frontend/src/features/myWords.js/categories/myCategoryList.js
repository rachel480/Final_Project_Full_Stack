import { useState } from "react"
import SearchInput from "../../../components/searchInput"
import { useGetAllMyCategorysQuery } from "./myCategoryApi"
import AddCategoryForm from "./addCategoryForm"
import Categorycard from "./categorycard"
import SingleCategoryWords from "./singleCategoryWords"

const MyCategoryList = () => {
    const [searchText, setSearchText] = useState("")
    const { data: categories = [], isLoading, error } = useGetAllMyCategorysQuery()
    const [showAddForm, setShowAddForm] = useState(false)
    const [showSingleCategory, setShowSingleCategory] = useState(null)

    const filteredcategories = categories.filter((category) => category.name.indexOf(searchText.toLowerCase()) > -1)
    if (isLoading)
        return <p>loading categoies...</p>

    if (error)
        return <p>{error?.data?.message || "something went wrong"}</p>

    return (
        <div>
            {!showSingleCategory &&
                <div>
                    <heder>
                        <SearchInput searchText={searchText} setSearchText={setSearchText} placeholder={'Search category...'} />
                        <button onClick={() => setShowAddForm(true)}> ➕</button>

                    </heder>

                    {filteredcategories.map((category) => <h1><Categorycard category={category} setShowSingleCategory={setShowSingleCategory} /></h1>)}

                </div>
            }
            {showAddForm && <AddCategoryForm setShowAddForm={setShowAddForm} />}
            {showSingleCategory && <SingleCategoryWords setShowSingleCategory={setShowSingleCategory} showSingleCategory={showSingleCategory} />}
        </div>
    )
}
export default MyCategoryList