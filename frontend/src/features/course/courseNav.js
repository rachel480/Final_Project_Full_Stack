import { NavLink } from "react-router-dom"

const CourseNav=()=>{
return(
    <nav>
        <NavLink to="">categories</NavLink>
        <NavLink to="words">words</NavLink>
        <NavLink to="finalTest">final test</NavLink>
    </nav>
)
}
export default CourseNav