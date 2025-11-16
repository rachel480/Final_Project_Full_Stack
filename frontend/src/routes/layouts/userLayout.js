import { Outlet } from 'react-router-dom'
import UserNavigation from '../navigation/userNavigation'
import Footer from '../../components/footer'

const UserLayout = () => {
  return (
    <div className="mt-[85px] min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <UserNavigation />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default UserLayout