import { Outlet } from "react-router-dom"
import MyWordNavigation from "../navigation/myWordsNavigation"

const MyWordLayout=()=>{
return <div>
    <MyWordNavigation/>
    <main><Outlet /></main>
  </div>
}
export default MyWordLayout