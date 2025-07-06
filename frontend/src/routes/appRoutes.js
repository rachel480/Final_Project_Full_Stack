import {Routes,Route} from 'react-router-dom'
import RegisterForm from '../features/auth/registerForm'
import LoginForm from '../features/auth/loginForm'
import Layout from './layout'
import Loby from '../pages/userDashbord'

const AppRoutes=()=>{
    return (
<Routes>
    <Route path='/' element={<Layout/>}>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='userDashbord' element={<Loby/>} />
    </Route>
</Routes>
)
}

export default AppRoutes