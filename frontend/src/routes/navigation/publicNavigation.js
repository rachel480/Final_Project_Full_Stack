import Header from "../../components/header"
import CustomNavLink from "../../components/customNavlink"

const PublicNavigation = () => {
    return (
        <Header>
            <CustomNavLink to='about' style={{marginRight:'20px'}}>אודותינו</CustomNavLink>
            <CustomNavLink to='contact' style={{marginRight:'20px'}}>יצירת קשר</CustomNavLink>
            <CustomNavLink to='login' style={{marginRight:'20px'}}>כניסה והרשמה</CustomNavLink>
        </Header>
    )
}

export default PublicNavigation