import { useState } from "react"
import CategoryWordDetailes from "./categoryWordDetailes"
import { useGetWordsOfCategoryQuery } from "./myCategoryApi"
import AddWordForm from "../words/addWordForm"

const SingleCategoryWords = ({ showSingleCategory, setShowSingleCategory }) => {
    const { data: words, isLoading, error } = useGetWordsOfCategoryQuery(showSingleCategory)
     const [showAddForm, setShowAddForm] = useState(false)

    if (isLoading)
        return <p>loading categoy words...</p>

    if (error)
        return <p>{error?.data?.message || "something went wrong"}</p>

    return (
        <div>
            {
                words.map((word)=>(
                    <div>
                        <CategoryWordDetailes word={word}/>
                    </div>
                ))
            }
            <button onClick={()=>setShowAddForm(true)}>➕</button>
            <button onClick={() => setShowSingleCategory(null)}>back</button>
            {showAddForm&&<AddWordForm setShowAddForm={setShowAddForm}/>}
        </div>
    )
}
export default SingleCategoryWords
