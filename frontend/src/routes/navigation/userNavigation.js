import { useSelector } from "react-redux"
import { selectIsAdmin } from "../../features/auth/authSlice"
import UserProfileMenu from "../../features/user/userProfileMenu"
import Header from "../../components/header"
import CustomNavLink from "../../components/customNavlink"

const UserNavigation = () => {
    const isAdmin = useSelector(selectIsAdmin)

    return (
        <Header>
            {isAdmin && (<CustomNavLink to='admin'>ניהול</CustomNavLink>)}
            <CustomNavLink to="add-recommendion">הוספת המלצה</CustomNavLink>
            <CustomNavLink to='my-words'>המילים שלי</CustomNavLink>
            <CustomNavLink to='course-list' >הקורסים שלי</CustomNavLink>
            <CustomNavLink to='home-page' >דף הבית</CustomNavLink>
            <UserProfileMenu />
        </Header>
    )
}

export default UserNavigation