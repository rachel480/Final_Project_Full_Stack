import SideMenu from "../../components/sideMenu"
import CustomNavLink from "../../components/customNavlink"
import PageTitle from "../../components/pageTitle"
import { selectUser } from "../../features/auth/authSlice"
import { useSelector } from "react-redux"

const MyWordNavigation = () => {
   const user = useSelector(selectUser)

   return <div className="mt-[64px] p-4">
      <PageTitle text={` כאן תוכל לנהל את המילים האישיות שלך !${user.fullName }שלום`}/>
      <SideMenu>
         <CustomNavLink to='favorites'>מילים מועדפות</CustomNavLink>
         <CustomNavLink to='list'>מילים שלי</CustomNavLink>
      </SideMenu>
   </div>
}

export default MyWordNavigation