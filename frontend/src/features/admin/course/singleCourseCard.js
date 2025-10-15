import { useParams, useNavigate } from "react-router-dom"
import { useGetFullCourseByIdQuery } from "../../course/courseApi"
import NavigateButton from "../../../components/navigateButton"

const SingleCourseCard = () => {
   const { courseId } = useParams()
   const { data: course, isLoading, error } = useGetFullCourseByIdQuery(courseId)
   const navigate = useNavigate()

   if (isLoading) return <p>loading courses...</p>
   if (error) return <p>{error?.data?.message || "something went wrong"}</p>

   return (
      <div style={{
         maxWidth: "650px",
         margin: "20px auto",
         padding: "20px",
         border: "1px solid #ddd",
         borderRadius: "8px",
         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
         backgroundColor: "#fff",
         fontFamily: "Arial, sans-serif"
      }}>
         <NavigateButton 
            navigation={'/user/admin/data/courses'} 
            buttonText={'🔙'} 
            style={{ marginBottom: "15px" }}
         />

         <h2 style={{ marginBottom: "10px" }}>{course.name}</h2>
         <p style={{ margin: "4px 0" }}><strong>Level:</strong> {course.level}</p>
         <p style={{ margin: "4px 0" }}><strong>Status:</strong> {course.status}</p>

         <div style={{ marginTop: "15px" }}>
            <strong>Categories:</strong>
            <div style={{ marginTop: "5px" }}>

               <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  marginBottom: "8px",
                  border: "1px dashed #aaa",
                  borderRadius: "6px",
                  backgroundColor: "#fafafa"
               }}>
                  <span style={{ fontWeight: "bold", color: "#555" }}>Add Category</span>
                  <button
                     style={{
                        backgroundColor: "#2196f3",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer"
                     }}

                     onClick={()=>{navigate('category/add')}}
                  >
                     ➕
                  </button>
               </div>

               {course.categories.map(category => (
                  <div key={category._id} style={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                     padding: "10px",
                     marginBottom: "8px",
                     border: "1px solid #ddd",
                     borderRadius: "6px",
                     backgroundColor: "#f5f5f5"
                  }}>
                     <button
                        onClick={() => navigate(`category/${category._id}`)}
                        style={{
                           backgroundColor: "#4caf50",
                           color: "#fff",
                           border: "none",
                           padding: "6px 10px",
                           borderRadius: "4px",
                           cursor: "pointer",
                           fontWeight: "bold",
                           textDecoration:"underLine"
                        }}
                     >
                        {category.name}
                     </button>

                     <div style={{ display: "flex", gap: "6px" }}>
                        <button
                           style={{
                              backgroundColor: "#e53935",
                              color: "#fff",
                              border: "none",
                              padding: "5px 8px",
                              borderRadius: "4px",
                              cursor: "pointer"
                           }}
                        >
                           🗑️ 
                        </button>

                        <button
                           style={{
                              backgroundColor: "#fbc02d",
                              color: "#333",
                              border: "none",
                              padding: "5px 8px",
                              borderRadius: "4px",
                              cursor: "pointer"
                           }}
                        >
                           ✏️ 
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default SingleCourseCard
