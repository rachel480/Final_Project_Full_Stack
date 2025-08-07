import { NavLink } from "react-router-dom"

const CourseNavigation=()=>{
return(
    <nav>
        <NavLink to='category'>categories</NavLink>
        <NavLink to="words">words</NavLink>
        <NavLink to="final-test">final test</NavLink>
    </nav>
)
}
export default CourseNavigation