import { Outlet } from "react-router-dom"
import MyWordNavigation from "../navigation/myWordsNavigation"

const MyWordLayout=()=>{
return <div>
    <MyWordNavigation/>
    <main className="mt-[32px] p-4"><Outlet /></main>
  </div>
}
export default MyWordLayout