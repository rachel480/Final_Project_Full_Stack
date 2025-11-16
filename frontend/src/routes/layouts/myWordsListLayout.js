import { Outlet } from "react-router-dom"
import MyWordsListNavigation from "../navigation/myWordsListNavigation"

const MyWordsListLayout=()=>{
  return <div>
    <MyWordsListNavigation/>
    <main className="mt-[32px] p-4"><Outlet /></main>
  </div>
}


export default MyWordsListLayout