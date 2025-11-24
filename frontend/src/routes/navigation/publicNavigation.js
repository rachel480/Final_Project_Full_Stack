import Header from "../../components/header"
import CustomNavLink from "../../components/customNavlink"

const PublicNavigation = () => {
    return (
        <Header>
            <CustomNavLink to='contact' >יצירת קשר</CustomNavLink>
            <CustomNavLink to='login' >כניסה והרשמה</CustomNavLink>
            <CustomNavLink to='about' >אודותינו</CustomNavLink>
        </Header>
    )
}

export default PublicNavigation