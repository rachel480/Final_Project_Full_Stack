import Header from "../../components/header"
import CustomNavLink from "../../components/customNavlink"

const PublicNavigation = () => {
    return (
        <Header>
            <CustomNavLink to='about' >אודותינו</CustomNavLink>
            <CustomNavLink to='contact' >יצירת קשר</CustomNavLink>
            <CustomNavLink to='login' >כניסה והרשמה</CustomNavLink>
        </Header>
    )
}

export default PublicNavigation