import { Outlet, useParams } from "react-router-dom"
import { useGetCategoryByIdQuery } from "../../features/category/categoryApi"
import CategoryNavigation from "../navigation/categoryNavigation"
import FormTitle from "../../components/formTitle"

const CategoryLayout = () => {
   const { categoryId } = useParams()
   const { data: category, isLoading, error } = useGetCategoryByIdQuery(categoryId)

   if (isLoading)
      return <p>Loading category detailes....</p>

   if (error)
      return <p>Error loading category detailes!!</p>

   return (
      <div>
         <FormTitle text={`${category.name} category`}/> 
         <CategoryNavigation/>
         <main className="mt-[32px] p-4"><Outlet /></main>
      </div>
   )
}

export default CategoryLayout