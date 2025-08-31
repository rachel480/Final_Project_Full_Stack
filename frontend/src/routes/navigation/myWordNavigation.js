import { NavLink } from "react-router-dom"

const MyWordNavigation=()=>{
 return<div>
    <NavLink to='favorite'>favorite words</NavLink><br></br>
    <NavLink to='list'>my words</NavLink>
 </div>
 
}
export default MyWordNavigation