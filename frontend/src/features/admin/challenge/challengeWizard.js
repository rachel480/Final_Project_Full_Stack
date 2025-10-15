import { useSelector, useDispatch } from "react-redux"
import { goToStep, selectWizardStep, selectWizardData, setChallengeInfo, resetWizard } from "./challengeWizardSlice"
import NavigateButton from "../../../components/navigateButton"
import { useParams, useNavigate } from "react-router-dom"
import FinalSaveButton from "../common/finalSaveButton"
import { useState } from "react"
import { useCreateFullChallengeMutation } from "../../challenge/challengeApi"
import AddChallengeInfo from "./addChallengeInfo"

const ChallengeWizard = () => {
    const step = useSelector(selectWizardStep)
    const wizardData = useSelector(selectWizardData)
    const dispatch = useDispatch()
    const { categoryId,courseId } = useParams()
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    const [createFullChallenge] = useCreateFullChallengeMutation()

    const onClick = async () => {
        try {
            setErrorMsg(null)
            const addChallengeData = {
                questions: wizardData.challengeInfo.questions,
                categoryId
            }
            await createFullChallenge(addChallengeData).unwrap()
            dispatch(resetWizard())
            navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}`)
        } catch (err) {
            console.error(err)
            setErrorMsg(err?.data?.message || err.message || "Error creating challenge")
        }
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <AddChallengeInfo
                        setChallengeInfo={setChallengeInfo} 
                        goToStep={goToStep} 
                        selectWizardStep={selectWizardStep}
                        categoryId={categoryId}
                    />
                )
            default:
                return (
                    <FinalSaveButton
                        onClick={onClick}
                        disabled={!wizardData.challengeInfo.questions.length}
                    />
                )
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Create Challenge Wizard</h1>

            <NavigateButton navigation={`/user/admin/data/courses/${courseId}/category/${categoryId}`} buttonText={"🔙"} />

            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[1, 2].map((s) => (
                    <div
                        key={s}
                        style={{
                            padding: "6px 12px",
                            borderRadius: 4,
                            background: step === s ? "blue" : "lightgray",
                            color: step === s ? "white" : "black",
                            cursor: "pointer",
                        }}
                        onClick={() => dispatch(goToStep(s))}
                    >
                        {s}
                    </div>
                ))}
            </div>

            {renderStep()}
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        </div>
    )
}

export default ChallengeWizard