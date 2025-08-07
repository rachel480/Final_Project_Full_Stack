import { NavLink } from "react-router-dom"

const PublicNavigation = () => {
    return (
        <header style={{display:'flex'}}>
            <NavLink to='about' style={{marginRight:'20px'}}>אודותינו</NavLink>
            <NavLink to='contact' style={{marginRight:'20px'}}>צור קשר</NavLink>
            <NavLink to='login' style={{marginRight:'20px'}}>כניסה והרשמה</NavLink>
        </header>
    )
}

export default PublicNavigation