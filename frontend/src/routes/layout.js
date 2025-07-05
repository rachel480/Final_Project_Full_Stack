import {Outlet} from 'react-router-dom'
import Navigation from './navigation'

const Layout=()=>{
return(
<div>
    <nav><Navigation/></nav>
    <main><Outlet/></main>
</div>
)
}
export default Layout