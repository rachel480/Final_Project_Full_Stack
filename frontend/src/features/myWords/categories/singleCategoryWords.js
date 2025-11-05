import { useState } from "react"
import CategoryWordDetailes from "./categoryWordDetailes"
import { useGetWordsOfCategoryQuery } from "./myCategoryApi"
import AddWordForm from "../words/addWordForm"
import SearchInput from "../../../components/searchInput"

const SingleCategoryWords = ({ showSingleCategory:category, setShowSingleCategory }) => {
    const { data: words=[], isLoading, error } = useGetWordsOfCategoryQuery(category._id)
     const [showAddForm, setShowAddForm] = useState(false)
     const [searchText,setSearchText]=useState('')
     const filteredWord = words.filter((word) => word.word.word.indexOf(searchText.toLowerCase()) > -1)
    if (isLoading)
        return <p>loading categoy words...</p>

    if (error)
        return <p>{error?.data?.message || "something went wrong"}</p>

    return (
        <div>
            <div>
            <button onClick={()=>setShowAddForm(true)}>➕</button>
            <button onClick={() => setShowSingleCategory(null)}>back</button>
            <SearchInput searchText={searchText}  setSearchText={setSearchText} placeholder={'Search word...'}/>
            </div>
            {
                filteredWord.length===0?<h1>no words found in category</h1>:
                filteredWord.map((word)=>(
                    <div>
                        <CategoryWordDetailes word={word}/>
                    </div>
                ))
            }
            {showAddForm&&<AddWordForm setShowAddForm={setShowAddForm} currentCategory={category.name}/>}
        </div>
    )
}
export default SingleCategoryWords
