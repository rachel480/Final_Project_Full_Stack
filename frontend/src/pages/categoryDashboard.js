import { Outlet, useParams } from "react-router-dom"
import { useGetCategoryByIdQuery } from "../features/category/categoryApi"
import CategoryNav from "../features/category/categoryNav"

const CategoryDashboard=()=>{
const {categoryId}=useParams()
const {data:category,isLoading,error}=useGetCategoryByIdQuery(categoryId)

    if(isLoading)
        return <p>Loading category detailes....</p>

    if(error)
        return <p>Error loading category detailes!!</p>
    return(
        <div>
            <h1>{category.name} category</h1>
            <CategoryNav categoryName={category.name}/>
            <Outlet/>
        </div>
    )
}
export default CategoryDashboard