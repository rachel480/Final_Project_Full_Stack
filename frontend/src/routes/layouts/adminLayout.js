import { Outlet } from "react-router-dom";
import AdminNavigation from "../navigation/adminNavigation";

const AdminLayout = () => {
  return (
    <div>
      <nav><AdminNavigation /></nav>
      <main><Outlet /></main>
    </div>
  )
}

export default AdminLayout
