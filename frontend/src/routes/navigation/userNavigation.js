import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsAdmin } from "../../features/auth/authSlice"
const UserNavigation = () => {
    const isAdmin=useSelector(selectIsAdmin)
    return (
        <header style={{display:'flex'}}>
            <NavLink to='home-page' style={{marginRight:'20px'}}>home page</NavLink>
            <NavLink to='course-list' style={{marginRight:'20px'}}>my courses</NavLink>
            <NavLink to='my-words' style={{marginRight:'20px'}}>my words</NavLink>
            <NavLink to='fourums' style={{marginRight:'20px'}}>fourms</NavLink>
            <NavLink to='profile' style={{marginRight:'20px'}}>user profile</NavLink>
        {isAdmin&&(<NavLink to='admin' style={{marginRight:'20px'}}>management</NavLink>)}
        </header>
    )
}

export default UserNavigation