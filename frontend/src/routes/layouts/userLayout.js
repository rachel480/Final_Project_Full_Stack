import { Outlet } from 'react-router-dom'
import UserNavigation from '../navigation/userNavigation'
import Footer from '../../components/footer'

const UserLayout = () => {
  return (
   <div className="mt-[140px] min-h-screen flex flex-col bg-gradient-to-bl from-white via-green-300/20 to-orange-50/40  dark:from-[#1f1f1f]
        dark:to-gray-800">
 
      <UserNavigation />

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default UserLayout