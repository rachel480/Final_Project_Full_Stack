import SideMenu from "../../components/sideMenu";
import CustomNavLink from "../../components/customNavlink";

const AdminNavigation = () => {
  return (
    <SideMenu>
      <CustomNavLink to="data">ניהול נתונים</CustomNavLink>
      <CustomNavLink to="users">ניהול משתמשים</CustomNavLink>
    </SideMenu>
  )
}

export default AdminNavigation