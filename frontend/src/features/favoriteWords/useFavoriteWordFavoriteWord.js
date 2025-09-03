import { useCreateFavoriteWordMutation } from './favoriteWordApi'
import { useState } from "react";

 const useFavoriteWord = () => {
  const [createFavoriteWord] = useCreateFavoriteWordMutation()
  const [message, setMessage] = useState(null)

  const handleCreateFavoriteWord = async (favoriteWordData) => {
    setMessage(null)
    try {
      await createFavoriteWord(favoriteWordData).unwrap()
      setMessage({ type: "success", text: "Word added to favorites!" })
    } catch (err) {
      const errorMsg = err?.data?.message || err?.error || "Unknown error"
      setMessage({ type: "error", text: errorMsg })
    }
  }

  return { handleCreateFavoriteWord, message };
}
export default useFavoriteWord