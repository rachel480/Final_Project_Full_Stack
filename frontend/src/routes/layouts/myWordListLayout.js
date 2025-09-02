import MyWordListNavigation from "../navigation/myWordListNavigation"
import {Outlet} from 'react-router-dom'
const MyWordListLayout=()=>{
return <div>
    <MyWordListNavigation/>
    <Outlet/>
</div>
}
export default MyWordListLayout