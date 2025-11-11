import { Outlet } from 'react-router-dom'
import UserNavigation from '../navigation/userNavigation'

const UserLayout = () => {
    return (
        <div>
            <UserNavigation />
            <main className="mt-[32px] p-4"><Outlet/></main>
        </div>
    )
}
export default UserLayout