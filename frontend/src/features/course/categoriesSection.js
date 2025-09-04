import { useParams,useNavigate } from "react-router-dom"
import { useGetCourseCategoriesQuery } from "./courseApi"

const CategoriesSection = () => {
    const { courseId } = useParams()
    const navigate=useNavigate()
    const { data: categories, isLoading, error } = useGetCourseCategoriesQuery(courseId)

    if (isLoading)
        return <p>loading categories...</p>

    if (error)
        return <p>error loading categories...</p>

    return (
        <ul>
            {categories.map((category) => (
                <button onClick={()=>navigate(`${category._id}`)} >{category.name}</button>
            ))}
        </ul>
    )
}

export default CategoriesSection