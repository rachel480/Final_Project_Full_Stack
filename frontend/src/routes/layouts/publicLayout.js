import { Outlet } from "react-router-dom"
import PublicNavigation from "../navigation/publicNavigation"
import SideMenu from "../../components/sideMenu"

const PublicLayout = () => {
    return <div className="mt-[140px] min-h-screen flex flex-col bg-gradient-to-bl from-white via-green-300/20 to-orange-50/40 dark:from-[#1f1f1f]  dark:to-gray-800">
        <PublicNavigation />
        <SideMenu/>
        <main className="flex-1 max-w-7xl mx-auto w-full p-6"><Outlet /></main>
    </div>
}

export default PublicLayout