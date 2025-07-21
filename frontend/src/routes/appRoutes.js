import {Routes,Route} from 'react-router-dom'
import RegisterForm from '../features/auth/registerForm'
import LoginForm from '../features/auth/loginForm'
import Layout from './layout'
import UserDashboard from '../pages/userDashboard'
import CourseDashboard from '../pages/courseDashboard'
import CourseList from '../features/course/courseList'
import WordsSection from '../features/course/wordsSection'
import CategoriesSection from '../features/course/categoriesSection'
import FinalTestSection from '../features/course/finalTestSection'

const AppRoutes=()=>{
    return (
<Routes>
    <Route path='/' element={<Layout/>}>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/userDashboard' element={<UserDashboard/>} />
        <Route path='/courseList' element={<CourseList/>}/>
        <Route path={`/courseDashboard/:courseId`} element={<CourseDashboard/>}>
          <Route index element={<CategoriesSection/>}/>
          <Route path='words' element={<WordsSection/>}/>
          <Route path='finalTest' element={<FinalTestSection/>}/>
        </Route>
    </Route>
</Routes>
)
}

export default AppRoutes