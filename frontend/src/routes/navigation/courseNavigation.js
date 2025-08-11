import { NavLink } from "react-router-dom"

const CourseNavigation=()=>{
return(
    <nav>
        <NavLink to='category'>categories</NavLink><br></br>
        <NavLink to="words">words</NavLink><br></br>
        <NavLink to="final-test">final test</NavLink>
    </nav>
)
}
export default CourseNavigation