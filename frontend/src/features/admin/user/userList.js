import { useNavigate } from "react-router-dom"
import { useGetAllUsersQuery } from "../../user/userApi"
import UserCard from "./userCard"
import { HiUserGroup } from "react-icons/hi"
import AddButton from "../../../components/addButton" 
import SectionTitle from "../../../components/sectionTitle"
import CardContainer from "../../../components/cardContainer"
import DashedBox from "../../../components/dashedBox"
import { Box } from "@mui/material"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import InfoMessage from "../../../components/infoMessage"

const UserList = () => {
  const navigate = useNavigate()
  const { data: users, isLoading, error } = useGetAllUsersQuery()

  if (isLoading) return <LoadingSpinner text="טוען משתמשים..."/>
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש!!"}/>

  return (
    <CardContainer>

      <SectionTitle text={'משתמשים'} Icon={HiUserGroup} />

      <DashedBox className="!justify-center">
        <AddButton text="הוסף משתמש חדש" onClick={() => navigate("add")}/>
      </DashedBox>

      <Box>
        {users?.length ? (
          users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <InfoMessage message="לא נמצאו משתמשים"/>
        )}
      </Box>

    </CardContainer>
  )
}

export default UserList