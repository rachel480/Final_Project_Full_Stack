import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "../features/auth/registerForm";
import LoginForm from "../features/auth/loginForm";
import CourseList from "../features/course/courseList";
import CategoryWordSection from "../features/category/words/wordsSection";
import CategoriesSection from "../features/course/categoriesSection";
import ChallengeSection from "../features/category/challengeSection/challengeSection";
import PublicLayout from "./layouts/publicLayout";
import CourseLayout from "./layouts/courseLayout";
import UserLayout from "./layouts/userLayout";
import CategoryLayout from "./layouts/categoryLayout";
import WordSection from "../features/course/wordSection";
import HomePage from "../pages/homePage";
import MyWordNavigation from "./navigation/myWordNavigation";
import FavoriteWordsList from "../features/favoriteWords/favoriteWordsList";
import MyWordList from "../features/myWords/words/myWordList";
import MyCategoryList from "../features/myWords/categories/myCategoryList";
import MyWords from "../features/myWords/myWords";
import ChallengeResults from "../features/category/challengeSection/results/challengeResults";
import AdminLayout from "./layouts/adminLayout";
import AdminCourseList from "../features/admin/course/courseList";
import CourseWizard from "../features/admin/course/CourseWizard";
import SingleCourseCard from "../features/admin/course/singleCourseCard";
import SingleCategoryCard from "../features/admin/category/singleCategoryCard";
import SingleWordCard from "../features/admin/word/singleWordCard";
import CategoryWizard from "../features/admin/category/categoryWizard";
import SingleChallengeCard from "../features/admin/challenge/singleChallengeCard";
import SingleQuestionCard from "../features/admin/question/singleQuestionCard";
import ChallengeWizard from "../features/admin/challenge/challengeWizard";
import QuestionWizard from "../features/admin/question/questionWizard";
import AddWordInfo from "../features/admin/word/addWordInfo";

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

        <Route index element={<Navigate to='home-page' />} />
        <Route path='home-page' element={<HomePage />} />
        <Route path='course-list' element={<CourseList />} />
        <Route path='forums' element={<h1>פורומים</h1>} />
        <Route path='profile' element={<h1>הפרופיל שלי</h1>} />

        <Route path='course/:courseId' element={<CourseLayout />}>
          <Route index element={<Navigate to='category' />} />
          <Route path='category' element={<CategoriesSection />} />
          <Route path='words' element={<WordSection />} />
          <Route path='final-test' element={<h1>מבחן סופי על כל מילות הקורס</h1>} />

          <Route path='category/:categoryId' element={<CategoryLayout />}>
            <Route index element={<Navigate to='words' />} />
            <Route path='words' element={<CategoryWordSection />} />

            <Route path='challenge'>
              <Route index element={<ChallengeSection />} />
              <Route path=':challengeId/results' element={<ChallengeResults />} />
            </Route>

          </Route>
        </Route>

        <Route path='my-words'>
          <Route index element={<MyWordNavigation />} />
          <Route path='favorites' element={<FavoriteWordsList />} />
          <Route path='list' element={<MyWords />}>
            <Route index element={<Navigate to='words' />} />
            <Route path='words' element={<MyWordList />} />
            <Route path='categories' element={<MyCategoryList />} />
          </Route>
        </Route>

        <Route path={'admin'} element={<AdminLayout />} >

          <Route path='data'>
            <Route index element={<Navigate to='courses' />} />

            <Route path='courses'>
              <Route index element={<AdminCourseList />} />
              <Route path=':courseId' >
                <Route index element={<SingleCourseCard />} />

                <Route path="category/:categoryId" >
                  <Route index element={<SingleCategoryCard />} />
                  <Route path="words/:wordId" element={<SingleWordCard />} />

                  <Route path='challenge/:challengeId'>
                    <Route index  element={<SingleChallengeCard/>}/>
                    <Route path='question/:questionId' element={<SingleQuestionCard/>}/>
                    <Route path='question/add' element={<QuestionWizard/>}/>
                  </Route>

                  <Route path='challenge/add' element={<ChallengeWizard/>}/>
                  <Route path='words/add' element={<AddWordInfo/>}/>
                </Route>

                <Route path='category/add' element={<CategoryWizard />} />

              </Route>

              <Route path='add' element={<CourseWizard />} />

            </Route>

          </Route >

          <Route path='users' element={<h1>משתמשים</h1>} />
          <Route path='recommendtions' element={<h1>המלצות</h1>} />

        </Route>

      </Route>

    </Routes>
  )
}

export default AppRoutes