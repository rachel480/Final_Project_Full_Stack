import SideMenu from "../../components/sideMenu"
import CustomNavLink from "../../components/customNavlink"

const CourseNavigation = () => {
    return (
        <SideMenu>
            <CustomNavLink to='category'>קטגוריות</CustomNavLink>
            <CustomNavLink to='words'>מילים</CustomNavLink>
        </SideMenu>
    )
}

export default CourseNavigation