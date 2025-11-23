import { Outlet } from "react-router-dom"
import MyWordsListNavigation from "../navigation/myWordsListNavigation"

const MyWordsListLayout=()=>{
  return <div>
    <MyWordsListNavigation/>
    <main><Outlet /></main>
  </div>
}


export default MyWordsListLayout