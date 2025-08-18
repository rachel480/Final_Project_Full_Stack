import { Outlet, useParams } from "react-router-dom"
import { useGetCategoryByIdQuery } from "../../features/category/categoryApi"
import CategoryNavigation from "../navigation/categoryNavigation"

const CategoryLayout=()=>{
const {categoryId}=useParams()
const {data:category,isLoading,error}=useGetCategoryByIdQuery(categoryId)

    if(isLoading)
        return <p>Loading category detailes....</p>

    if(error)
        return <p>Error loading category detailes!!</p>
    return(
        <div>
            <h1>{category.name} category</h1>
            <CategoryNavigation />
            <Outlet/>
        </div>
    )
}
export default CategoryLayout