import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <header style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <NavLink to="courses">Manage Courses</NavLink>
      <NavLink to="categories">Manage Categories</NavLink>
      <NavLink to="words">Manage Words</NavLink>
      <NavLink to="users">Manage Users</NavLink>
      <NavLink to="questions">ManageQuestions</NavLink>
      <NavLink to="recommendtions">Manage Recommendtions</NavLink>
    </header>
  )
}

export default AdminNavigation
