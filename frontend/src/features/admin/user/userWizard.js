import { useSelector, useDispatch } from "react-redux";
import { goToStep, selectWizardStep, selectWizardData, resetWizard } from "./userWizardSlice";
import { useNavigate } from "react-router-dom";
import FinalSaveButton from "../common/finalSaveButton";
import { useCreateNewUserMutation } from "../../user/userApi";
import WizardLayout from "../common/wizardLayout";
import { toast } from "react-toastify";
import wizardSteps from "../common/wizardSteps";
import AddUserForm from "./addUserForm";

const UserWizard = () => {
  const step = useSelector(selectWizardStep)
  const wizardData = useSelector(selectWizardData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [createNewUser] = useCreateNewUserMutation()

  const handleStepChange = (number) => {
    dispatch(goToStep(number))
  }

  const onClick = async () => {
    try {
      const userData = wizardData.userInfo

      await createNewUser(userData).unwrap()

      toast.success("המשתמש נוסף בהצלחה!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate("/user/admin/users"),
      })

      dispatch(resetWizard())
    } catch (err) {
      console.error(err)
      const msg = err?.data?.message || err.message || "שגיאה ביצירת משתמש"
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AddUserForm />
      default:
        return (
          <FinalSaveButton
            onClick={onClick}
            disabled={ !wizardData.userInfo.userName || !wizardData.userInfo.password || !wizardData.userInfo.fullName || !wizardData.userInfo.email}
          />
        )
    }
  }

  return (
    <WizardLayout
      title="הוספת משתמש - Wizard"
      steps={wizardSteps.userSteps}
      step={step}
      onStepChange={handleStepChange}
      renderStep={renderStep}
      backNavigation="/user/admin/users"
    />
  )
}

export default UserWizard
