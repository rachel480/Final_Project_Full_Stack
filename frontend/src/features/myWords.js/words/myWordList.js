
import { useState } from "react"
import { useGetAllMyWordsQuery } from "./myWordApi"
import MyWordCard from "./myWordCard"
import AddWordForm from "./addWordForm"

const MyWordList=()=>{
const {data:words,isLoading,error}=useGetAllMyWordsQuery()
const [showAddForm, setShowAddForm] = useState(false)
if (isLoading)
        return <p>loading words...</p>

    if (error)
        return <p>{error?.data?.message || "something went wrong"}</p>

return <div>
   <button onClick={()=>setShowAddForm(true)}>➕</button>
    {
        words.map((word)=><MyWordCard myWord={word}  />)
    }
    {showAddForm && <AddWordForm setShowAddForm={setShowAddForm} />}
</div>
}
export default MyWordList