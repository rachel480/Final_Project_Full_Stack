import SideMenu from "../../components/sideMenu"
import CustomNavLink from "../../components/customNavlink"


const MyWordsListNavigation = () => {
  return <SideMenu>
    <CustomNavLink to='words'>מילים</CustomNavLink>
    <CustomNavLink to='categories'>קטגוריות</CustomNavLink>
  </SideMenu>
}

export default MyWordsListNavigation