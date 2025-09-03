import { useCreateFavoriteWordMutation } from './favoriteWordApi'
import { useState } from "react";

 const useFavoriteWord = () => {
  const [createFavoriteWord] = useCreateFavoriteWordMutation()
  const [message, setMessage] = useState(null)

  const handleCreateFavoriteWord = async (favoriteWordData) => {
    setMessage(null)
    try {
     const res= await createFavoriteWord(favoriteWordData).unwrap()
      setMessage({ type: "success", text:res?.message|| "Word added to favorites!" })
      setTimeout(()=>setMessage(null),2000)
    } catch (err) {
      const errorMsg = err?.data?.message || err?.error || "Unknown error"
      setMessage({ type: "error", text: errorMsg })
      setTimeout(()=>setMessage(null),2000)
    }
  }

  return { handleCreateFavoriteWord, message };
}
export default useFavoriteWord