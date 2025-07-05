import { NavLink } from "react-router-dom"

const Navigation=()=>{
    return(
        <div >
            <li><NavLink to='/register'>register</NavLink></li>
        <li><NavLink to='/login'>login</NavLink></li>
        </div>
        )
    

}
export default Navigation