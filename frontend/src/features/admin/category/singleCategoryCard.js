import { NavLink, useParams, useNavigate } from "react-router-dom"
import { useGetFullCategoryByIdQuery } from "../../category/categoryApi"
import NavigateButton from "../../../components/navigateButton"

const SingleCategoryCard = () => {
  const { categoryId, courseId } = useParams()
  const { data: category, isLoading, error } = useGetFullCategoryByIdQuery(categoryId)
  const navigate = useNavigate()

  if (isLoading) return <p>loading category...</p>
  if (error) return <p>{error?.data?.message || "something went wrong"}</p>
  if (!category) return <p>Category not found</p>

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
        navigation={`/user/admin/data/courses/${courseId}`}
        buttonText={'🔙'}
        style={{ marginBottom: "15px" }}
      />

      <h2 style={{ marginBottom: "10px" }}>{category.name}</h2>

      {/* Challenge block */}
      <div style={{ marginTop: "15px" }}>
        <strong>Challenge:</strong>
        <div style={{ marginTop: "5px" }}>

          {category.challenge ? (
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              backgroundColor: "#f5f5f5"
            }}>
              <NavLink
                to={`challenge/${category.challenge._id}`}
                style={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underLine"
                }}
              >
                Challenge
              </NavLink>

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
          )
            :
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
              <span style={{ fontWeight: "bold", color: "#555" }}>Add Challenge</span>
              <button
                style={{
                  backgroundColor: "#2196f3",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
                onClick={() => navigate(`challenge/add`)}
              >
                ➕
              </button>
            </div>
          }
        </div>
      </div>

      {/* Words block */}
      <div style={{ marginTop: "20px" }}>
        <strong>Words:</strong>
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
            <span style={{ fontWeight: "bold", color: "#555" }}>Add Word</span>
            <button
              style={{
                backgroundColor: "#2196f3",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer"
              }}
              onClick={() => navigate(`words/add`)}
            >
              ➕
            </button>
          </div>

          {category.words.map(word => (
            <div key={word._id} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              backgroundColor: "#f5f5f5"
            }}>
              <NavLink
                to={`words/${word._id}`}
                style={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underLine"
                }}
              >
                {word.word}
              </NavLink>

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

export default SingleCategoryCard

// import { useNavigate, NavLink } from "react-router-dom"

// const CategoryCard = ({ category }) => {
//   const navigate = useNavigate()

//   return (
//     <div
//       style={{
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         padding: "15px",
//         marginBottom: "15px",
//         backgroundColor: "#fff",
//         boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
//       }}
//     >
//       {/* Category name */}
//       <h3 style={{ margin: "0 0 10px", color: "#333" }}>{category.name}</h3>

//       {/* Words */}
//       <div>
//         <strong>Words:</strong>
//         <div style={{ marginTop: "5px" }}>
//           {category.words && category.words.length > 0 ? (
//             category.words.map((word, i) => (
//               <div
//                 key={i}
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   padding: "8px",
//                   marginBottom: "6px",
//                   border: "1px solid #eee",
//                   borderRadius: "6px",
//                   backgroundColor: "#fafafa"
//                 }}
//               >
//                 <span>{word.word} - {word.translation}</span>
//                 <div style={{ display: "flex", gap: "6px" }}>
//                   <button
//                     style={{
//                       backgroundColor: "#e53935",
//                       color: "#fff",
//                       border: "none",
//                       padding: "4px 8px",
//                       borderRadius: "4px",
//                       cursor: "pointer"
//                     }}
//                   >
//                     🗑️
//                   </button>
//                   <button
//                     style={{
//                       backgroundColor: "#fbc02d",
//                       color: "#333",
//                       border: "none",
//                       padding: "4px 8px",
//                       borderRadius: "4px",
//                       cursor: "pointer"
//                     }}
//                   >
//                     ✏️
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div style={{ color: "#777" }}>No words yet.</div>
//           )}

//           {/* Add Word button */}
//           <button
//             style={{
//               marginTop: "8px",
//               backgroundColor: "#2196f3",
//               color: "#fff",
//               border: "none",
//               padding: "6px 10px",
//               borderRadius: "4px",
//               cursor: "pointer"
//             }}
//             onClick={() => navigate("word/add")}
//           >
//             ➕ Add Word
//           </button>
//         </div>
//       </div>

//       {/* Challenge block */}
//       <div style={{ marginTop: "15px" }}>
//         <strong>Challenge:</strong>
//         <div style={{ marginTop: "5px" }}>
//           {/* אם אין אתגר - מציגים כפתור הוספה */}
//           {!category.challenge && (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "10px",
//                 marginBottom: "8px",
//                 border: "1px dashed #aaa",
//                 borderRadius: "6px",
//                 backgroundColor: "#fafafa"
//               }}
//             >
//               <span style={{ fontWeight: "bold", color: "#555" }}>Add Challenge</span>
//               <button
//                 style={{
//                   backgroundColor: "#2196f3",
//                   color: "#fff",
//                   border: "none",
//                   padding: "5px 10px",
//                   borderRadius: "4px",
//                   cursor: "pointer"
//                 }}
//                 onClick={() => navigate(`challenge/add`)}
//               >
//                 ➕
//               </button>
//             </div>
//           )}

//           {/* אם יש אתגר - מציגים אותו */}
//           {category.challenge && (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "10px",
//                 marginBottom: "8px",
//                 border: "1px solid #ddd",
//                 borderRadius: "6px",
//                 backgroundColor: "#f5f5f5"
//               }}
//             >
//               <NavLink
//                 to={`challenge/${category.challenge}`}
//                 style={{
//                   backgroundColor: "#4caf50",
//                   color: "#fff",
//                   border: "none",
//                   padding: "6px 10px",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                   textDecoration: "underline"
//                 }}
//               >
//                 Challenge
//               </NavLink>

//               <div style={{ display: "flex", gap: "6px" }}>
//                 <button
//                   style={{
//                     backgroundColor: "#e53935",
//                     color: "#fff",
//                     border: "none",
//                     padding: "5px 8px",
//                     borderRadius: "4px",
//                     cursor: "pointer"
//                   }}
//                 >
//                   🗑️
//                 </button>
//                 <button
//                   style={{
//                     backgroundColor: "#fbc02d",
//                     color: "#333",
//                     border: "none",
//                     padding: "5px 8px",
//                     borderRadius: "4px",
//                     cursor: "pointer"
//                   }}
//                 >
//                   ✏️
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CategoryCard

