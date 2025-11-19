import { useUpdateMyWordRaitingMutation, useDeleteMyWordMutation } from './myWordApi'
import { toast } from "react-toastify";

const useMyWord = () => {
    const [updateMyWordRaiting] = useUpdateMyWordRaitingMutation()
    const [deleteMyWord] = useDeleteMyWordMutation()

    const handleUpdateMyWordRaiting = async (myWordData) => {
        try {
            await updateMyWordRaiting(myWordData).unwrap()
            toast.success("המילה דורגה בהצלחה", {
                position: "top-right",
                autoClose: 3000,
            })
        } catch (err) {
            const errorMsg = err?.data?.message || err?.error || "משהו השתבש!!"
            toast.error(errorMsg, {
                position: "top-right",
                autoClose: 3000,
            })
        }
    }

    const handleDeleteMyWord = async (myWordData) => {
        try {
            await deleteMyWord(myWordData).unwrap()
            toast.success("המילה נמחקה בהצלחה!", {
                position: "top-right",
                autoClose: 3000,
            })

        } catch (err) {
            const errorMsg = err?.data?.message || err?.error || "מחיקה נכשלה!!"
            toast.error(errorMsg, {
                position: "top-right",
                autoClose: 3000,
            })
        }
    }

    return { handleUpdateMyWordRaiting, handleDeleteMyWord}
}

export default useMyWord