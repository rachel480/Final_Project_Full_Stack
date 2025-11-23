import { Outlet } from "react-router-dom";
import AdminNavigation from "../navigation/adminNavigation";
import PageTitle from "../../components/pageTitle";

const AdminLayout = () => {
  return (
    <div>
      <PageTitle text={'שלום המנהל כאן תוכל לנהל את האתר'}/>
      <AdminNavigation/>
      <main><Outlet /></main>
    </div>
  )
}

export default AdminLayout