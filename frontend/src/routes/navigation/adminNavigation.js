import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <header style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <NavLink to="data">Manage Data</NavLink>
      <NavLink to="users">Manage Users</NavLink>
      <NavLink to="recommendtions">Manage Recommendtions</NavLink>
    </header>
  )
}

export default AdminNavigation