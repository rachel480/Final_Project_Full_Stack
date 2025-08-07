import { NavLink } from "react-router-dom"

const CategoryNavigation=({categoryName})=>{
return (
    <nav>
    <NavLink to={`words/${categoryName}`}>words list</NavLink><br/>
    <NavLink to={'challenge'}>category challenge</NavLink><br/>
    </nav>
)
}
export default CategoryNavigation