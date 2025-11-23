import { Outlet } from "react-router-dom";
import AdminNavigation from "../navigation/adminNavigation";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavigation/>
      <main><Outlet /></main>
    </div>
  )
}

export default AdminLayout