import { Outlet, useParams } from "react-router-dom"
import { useGetCategoryByIdQuery } from "../../features/category/categoryApi"
import CategoryNavigation from "../navigation/categoryNavigation"
import FormTitle from "../../components/formTitle"
import LoadingSpinner from "../../components/loadingSpinner"
import ErrorMessage from "../../components/errorMessage"


const CategoryLayout = () => {
   const { categoryId } = useParams()
   const { data: category, isLoading, error } = useGetCategoryByIdQuery(categoryId)

   if (isLoading) return <LoadingSpinner text="טוען פרטי קטגוריה..."/>
   if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>
   return (
      <div>
         <FormTitle text={`${category.name} category`}/> 
         <CategoryNavigation/>
         <main><Outlet /></main>
      </div>
   )
}

export default CategoryLayout