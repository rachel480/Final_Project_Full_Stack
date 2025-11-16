import { Outlet } from "react-router-dom"
import PublicNavigation from "../navigation/publicNavigation"

const PublicLayout = () => {
    return <div>
        <PublicNavigation />
        <main className="mt-[32px] p-4"><Outlet /></main>
    </div>
}

export default PublicLayout