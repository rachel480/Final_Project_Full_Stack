import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "../features/auth/registerForm";
import LoginForm from "../features/auth/loginForm";
import CourseList from "../features/course/courseList";
import CategoryWordSection from "../features/category/wordsSection"
import CategoriesSection from "../features/course/categoriesSection";
import ChallengeSection from "../features/category/challengeSection";
import PublicLayout from "./layouts/publicLayout";
import CourseLayout from "./layouts/courseLayout";
import UserLayout from "./layouts/userLayout";
import CategoryLayout from "./layouts/categoryLayout";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Layout ציבורי - התחלה, הרשמה, התחברות וכו' */}
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Navigate to='about' />} />
        <Route path='about' element={<h1>אודותינו</h1>} />
        <Route path='contact' element={<h1>יצירת קשר</h1>} />
        <Route path='login' element={<LoginForm />} />
        <Route path='register' element={<RegisterForm />} />
      </Route>

      {/* Layout פרטי - רק לאחר התחברות */}
      <Route path='/user' element={<UserLayout />}>

        <Route index element={<Navigate to='course-list' />} />
        <Route path='course-list' element={<CourseList />} />
        <Route path='my-words' element={<h1>המילים שלי</h1>} />
        <Route path='forums' element={<h1>פורומים</h1>} />
        <Route path='profile' element={<h1>הפרופיל שלי</h1>} />

        <Route path='course/:courseId' element={<CourseLayout />}>
          <Route index element={<Navigate to='category' />} />
          <Route path='category' element={<CategoriesSection />} />
          <Route path='words' element={<h1>רשימת מילים כוללת לקורס</h1>} />
          <Route path='final-test' element={<h1>מבחן סופי על כל מילות הקורס</h1>} />
        </Route>

        <Route path='category/:categoryId' element={<CategoryLayout />}>
          <Route index element={<h1>about the category</h1>} />
          <Route path='words/:categoryName' element={<CategoryWordSection />} />
          <Route path='challenge' element={<ChallengeSection />} />
        </Route>

      </Route>
      
    </Routes>)
}

export default AppRoutes