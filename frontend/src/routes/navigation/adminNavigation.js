import SideMenu from "../../components/sideMenu";
import CustomNavLink from "../../components/customNavlink";

const AdminNavigation = () => {
  return (
    <SideMenu>
      <CustomNavLink to="data">ניהול נתונים</CustomNavLink>
      <CustomNavLink to="users">ניהול משתמשים</CustomNavLink>
      <CustomNavLink to="contact-messages">ניהול יצירות קשר</CustomNavLink>
      <CustomNavLink to="recommendions">המלצות גולשים</CustomNavLink>
    </SideMenu>
  )
}

export default AdminNavigation