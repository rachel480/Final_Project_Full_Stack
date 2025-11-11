import MyWordListNavigation from "../navigation/myWordsListNavigation"
import {Outlet} from 'react-router-dom'
const MyWordListLayout=()=>{
return <div>
    <MyWordListNavigation/>
    <Outlet/>
</div>
}
export default MyWordListLayout