import { Outlet } from "react-router-dom";
import AdminNavigation from "../navigation/adminNavigation";

const AdminLayout = () => {
  return (
    <div>
      <h2>שלום למנהל כאן תוכל לנהל את הנתונים </h2>
      <nav><AdminNavigation/></nav>
      <main><Outlet /></main>
    </div>
  )
}

export default AdminLayout