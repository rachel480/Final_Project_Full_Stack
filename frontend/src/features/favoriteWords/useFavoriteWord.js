import { useCreateFavoriteWordMutation } from './favoriteWordApi'
import { toast } from "react-toastify"

const useFavoriteWord = () => {
  const [createFavoriteWord] = useCreateFavoriteWordMutation()

  const handleCreateFavoriteWord = async (favoriteWordData) => {
    try {
      const res = await createFavoriteWord(favoriteWordData).unwrap()

      toast.success(res?.message || "המילה נוספה למועדפים בהצלחה", {
        position: "top-right",
        autoClose: 3000,
      })

    } catch (err) {
      const errorMsg = err?.data?.message || err?.error || "שגיאה בהוספת המילה למועדפים"
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return { handleCreateFavoriteWord}
}

export default useFavoriteWord
