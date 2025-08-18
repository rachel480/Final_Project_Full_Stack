import { NavLink } from "react-router-dom"

const CategoryNavigation=()=>{
return (
    <nav>
    <NavLink to={'words'}>words list</NavLink><br/>
    <NavLink to={'challenge'}>category challenge</NavLink><br/>
    </nav>
)
}
export default CategoryNavigation