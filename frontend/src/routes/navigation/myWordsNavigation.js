import SideMenu from "../../components/sideMenu"
import CustomNavLink from "../../components/customNavlink"
import { selectUser } from "../../features/auth/authSlice"
import { useSelector } from "react-redux"

const MyWordNavigation = () => {
   const user = useSelector(selectUser)

   return <div className="mt-[64px] p-4">
      <SideMenu>
         <CustomNavLink to='favorites'>מילים מועדפות</CustomNavLink>
         <CustomNavLink to='list'>מילים שלי</CustomNavLink>
      </SideMenu>
   </div>
}

export default MyWordNavigation