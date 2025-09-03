import { NavLink } from "react-router-dom"

const MyWordListNavigation=()=>{
 return<div>
    <NavLink to='words'>words</NavLink><br></br>
    <NavLink to='categories'>categories</NavLink>
 </div>
 
}
export default MyWordListNavigation