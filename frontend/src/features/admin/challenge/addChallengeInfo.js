import { useDispatch, useSelector } from "react-redux"
import { useGetFullCategoryByIdQuery } from "../../category/categoryApi"
import {createChallengeForCategory} from "./services/challengeServices"

const AddChallengeInfo = ({ setChallengeInfo, goToStep, selectWizardStep, categoryId }) => {

    const dispatch = useDispatch()
    const step = useSelector(selectWizardStep)

    const { data: category, isLoading, error } = useGetFullCategoryByIdQuery(categoryId)

    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>{error?.data|| "Something went wrong"}</p>
    if (!category) return <p>Category not found</p>

    const handleChallengeData = () => {
        //create challenge
        const challenge = createChallengeForCategory(category)
        //add challenge to slice
        dispatch(setChallengeInfo(challenge))
        dispatch(goToStep(step + 1))
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 480, margin: "0 auto", padding: 14, border: "1px solid #eee", borderRadius: 8, background: "#fff", boxShadow: "0 1px 4px rgba(16,24,40,0.04)", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", }}>
            <h1>Create Challenge</h1>

            <button type="button" style={{ marginTop: 10 }} onClick={() => handleChallengeData()} >
                Create challenge
            </button>

        </div>
    )
}

export default AddChallengeInfo