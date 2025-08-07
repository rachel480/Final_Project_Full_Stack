import {Outlet} from 'react-router-dom'
import PublicNavigation from '../navigation/publicNavigation'

const PublicLayout=()=>{
return(
<div>
    <nav><PublicNavigation/></nav>
    <main><Outlet/></main>
</div>
)
}
export default PublicLayout