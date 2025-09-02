import { useState } from "react"
import { useDeleteMyCategoryMutation } from "./myCategoryApi"
import UpdateCategoryForm from "./updateCategoryForm"

const Categorycard = ({ category ,setShowSingleCategory}) => {
    const [message,setMessage]=useState(null)
    const [showUpdateForm,setShowUpdateForm]=useState(false)
    
    const [deleteMyCategory, { isLoading: delateLoading }] = useDeleteMyCategoryMutation()
    
    
    const handelDelete = async() => {
        setMessage(null)
        try {
            const res = await deleteMyCategory({ id:category._id }).unwrap()
            setMessage({ type: 'success', text: res?.message || 'deleted successfully' })
        }
        catch (err) {
            const errorMsg =
                err?.data?.message ||
                err?.error ||
                'unknown error'
            setMessage({ type: 'error', text: errorMsg })
        }
    }
    
    return (
        <div>
        <div>
            <button onClick={()=>setShowSingleCategory(category._id)}>{category.name}</button>
            <button onClick={() => handelDelete()} disabled={delateLoading}>{delateLoading?'deleteing...':'🗑️'}</button>
            <button onClick={() => setShowUpdateForm(true)} >✏️</button>
        </div>
        {showUpdateForm&&<UpdateCategoryForm setShowUpdateForm={setShowUpdateForm} category={category}/>}
        {message && (<div style={{ color: message.type === 'error' ? 'red' : 'green', marginBottom: '1rem', }}>{message.text}</div>)}
        </div>
    )
}
export default Categorycard