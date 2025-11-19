import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "../features/auth/registerForm";
import LoginForm from "../features/auth/loginForm";
import CourseList from "../features/course/courseList";
import CategoryWordSection from "../features/category/words/wordsSection";
import CategoriesSection from "../features/course/categoriesSection";
import PublicLayout from "./layouts/publicLayout";
import CourseLayout from "./layouts/courseLayout";
import UserLayout from "./layouts/userLayout";
import CategoryLayout from "./layouts/categoryLayout";
import WordSection from "../features/course/wordSection";
import HomePage from "../pages/homePage";
import FavoriteWordsList from "../features/favoriteWords/FavoriteWordsList";
import MyWordList from "../features/myWords/words/myWordList";
import MyCategoryList from "../features/myWords/categories/myCategoryList";
import MyWords from "../features/myWords/myWords";
import ChallengeResults from "../features/category/challengeSection/results/challengeResults";
import AdminLayout from "./layouts/adminLayout";
import AdminCourseList from "../features/admin/course/courseList";
import CourseWizard from "../features/admin/course/courseWizard";
import SingleCourseCard from "../features/admin/course/singleCourseCard";
import SingleCategoryCard from "../features/admin/category/singleCategoryCard";
import SingleWordCard from "../features/admin/word/singleWordCard";
import CategoryWizard from "../features/admin/category/categoryWizard";
import SingleChallengeCard from "../features/admin/challenge/singleChallengeCard";
import SingleQuestionCard from "../features/admin/question/singleQuestionCard";
import ChallengeWizard from "../features/admin/challenge/challengeWizard";
import QuestionWizard from "../features/admin/question/questionWizard";
import UserList from "../features/admin/user/userList";
import SingleUserCard from "../features/admin/user/singleUserCard";
import UpdateUserForm from "../features/admin/user/updateUserForm";
import UpdateCourseForm from "../features/admin/course/updateCourseForm";
import UpdateCategoryForm from "../features/admin/category/updateCategoryForm";
import UpdateChallengeForm from "../features/admin/challenge/updateChallengeForm";
import UpdateWordForm from "../features/admin/word/updateWordForm";
import UpdateQuestionForm from "../features/admin/question/updateQuestionForm";
import ProtectedRoute from "../components/protectedRoute";
import UserProfileForm from "../features/user/userProfileForm";
import ResetPasswordForm from "../features/user/resetPasswordForm";
import MyWordLayout from "./layouts/myWordlayout";
import UserWizard from "../features/admin/user/userWizard";
import WordWizard from "../features/admin/word/wordWizard";
import ContactForm from "../features/contact/contactForm";
import ContactMessage from "../features/contact/contactMessages";
import ForgotPassword from "../features/auth/forgotPassword";
import ResetPassword from "../features/auth/resetPassword";
import ChallengeRoot from "../features/category/challengeSection/challengeRoot";
import FinalExamRoot from "../features/course/finalExam/finalExamRoot";
import AdminRecommendionList from "../features/recommention/admiRecommentionList";
import AddRecommendionForm from "../features/recommention/addRecommendionForm";
import AboutUs from "../pages/aboutUs";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Layout ציבורי - התחלה, הרשמה, התחברות וכו' */}
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Navigate to='about' />} />
        <Route path='about' element={<AboutUs/>} />
        <Route path='contact' element={<ContactForm/>} />
        <Route path='login' element={<LoginForm />} />
        <Route path='register' element={<RegisterForm />} />
        <Route path='forgot-password' element={<ForgotPassword/>} />
      <Route path='reset-password/:token' element={<ResetPassword/>} />
      </Route>

      {/* Layout פרטי - רק לאחר התחברות */}
      <Route path='/user' element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>

        <Route index element={<Navigate to='home-page' />} />
        <Route path='home-page' element={<HomePage />} />
        <Route path='course-list' element={<CourseList />} />
        <Route path='profile' element={<UserProfileForm/>} />
        <Route path='reset-password' element={<ResetPasswordForm/>}/>
        <Route path="add-recommendion" element={<AddRecommendionForm/>} />

        <Route path='course/:courseId' element={<CourseLayout />}>
          <Route index element={<Navigate to='category' />} />
          <Route path='category' element={<CategoriesSection />} />
          <Route path='words' element={<WordSection />} />
          <Route path='final-test' element={<FinalExamRoot/>} />

          <Route path='category/:categoryId' element={<CategoryLayout />}>
            <Route index element={<Navigate to='words' />} />
            <Route path='words' element={<CategoryWordSection />} />

            <Route path='challenge'>
              <Route index element={<ChallengeRoot/>} />
              <Route path=':challengeId/results' element={<ChallengeResults />} />
            </Route>

          </Route>
        </Route>

        <Route path='my-words' element={<MyWordLayout />} >
          <Route index element={<Navigate to='favorites' />}/>
          <Route path='favorites' element={<FavoriteWordsList />} />
          <Route path='list' element={<MyWords />}>
            <Route index element={<Navigate to='words' />} />
            <Route path='words' element={<MyWordList />} />
            <Route path='categories' element={<MyCategoryList />} />
          </Route>
        </Route>

        <Route path={'admin'} element={<AdminLayout />} >
        <Route index element={<Navigate to='data'/>}/>

          <Route path='data'>
            <Route index element={<Navigate to='courses' />} />

            <Route path='courses'>
              <Route index element={<AdminCourseList />} />
              <Route path=':courseId' >
                <Route index element={<SingleCourseCard />} />
                
                <Route path='update' element={<UpdateCourseForm/>}/>

                <Route path="category/:categoryId" >
                  <Route index element={<SingleCategoryCard />} />
                  <Route path="update" element ={<UpdateCategoryForm/>}/>
                  
                  <Route path="words/:wordId"  >
                   <Route index element={<SingleWordCard />}/>
                   <Route path="update" element ={<UpdateWordForm/>}/>
                  </Route>
                  
                  <Route path='challenge/:challengeId'>
                    <Route index  element={<SingleChallengeCard/>}/>
                    <Route path="update" element ={<UpdateChallengeForm/>}/>
                    <Route path='question/:questionId' >
                    <Route index element={<SingleQuestionCard/>} />
                    <Route path="update" element ={<UpdateQuestionForm/>}/>
                    </Route>
                    
                    <Route path='question/add' element={<QuestionWizard/>}/>
                  </Route>

                  <Route path='challenge/add' element={<ChallengeWizard/>}/>
                  <Route path='words/add' element={<WordWizard/>}/>
                </Route>

                <Route path='category/add' element={<CategoryWizard />} />
                

              </Route>

              <Route path='add' element={<CourseWizard />} />


            </Route>

          </Route >

          <Route path='users'>
            <Route index element={<UserList />} />
            <Route path=':userId' >
              <Route index element={<SingleUserCard/>} /> 
              <Route path="update" element={<UpdateUserForm/>}/>
            </Route>
            <Route path="add" element={<UserWizard/>}/>
          </Route>
          <Route path="contact-messages" element={<ContactMessage/>}/>
          <Route path="recommendions" element={<AdminRecommendionList/>}/>
        </Route>

      </Route>

    </Routes>
  )
}

export default AppRoutes