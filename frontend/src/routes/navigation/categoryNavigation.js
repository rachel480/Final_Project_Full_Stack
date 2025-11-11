import SideMenu from "../../components/sideMenu"
import CustomNavLink from "../../components/customNavlink"

const CategoryNavigation = () => {
    return (
        <SideMenu>
            <CustomNavLink to='words'>רשימת מילים</CustomNavLink>
            <CustomNavLink to='challenge'>אתגר של קטגוריה</CustomNavLink>
        </SideMenu>
    )
}

export default CategoryNavigation
