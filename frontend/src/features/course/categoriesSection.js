
import { useParams, useNavigate } from "react-router-dom"
import { useGetCourseCategoriesQuery } from "./courseApi"
import { useGetUserProgressByUserQuery } from "../userProgress/userProgressApi"
import { useState } from "react"

const CategoriesSection = () => {
  const { courseId } = useParams() 
  const navigate = useNavigate()
 
  const { data: categories, isLoading, error } = useGetCourseCategoriesQuery(courseId)
  const { data: userProgress } = useGetUserProgressByUserQuery()

  const [hoveredCategory, setHoveredCategory] = useState(null)

  if (isLoading) return <p>loading categories...</p>
  if (error) return <p>error loading categories...</p>

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {categories.map((category) => {
        const isCompleted = userProgress?.completedCategories?.some(
          (completed) => completed._id === category._id
        )
        const result = userProgress?.challengeResults?.find(
          (r) => r.challenge?._id.toString() === category.challenge
        )

        return (
          <div
            key={category._id}
            style={{ position: "relative" }}
            onMouseEnter={() => setHoveredCategory(category._id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <button
              onClick={() => navigate(`${category._id}`)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "1px solid gray",
                background: isCompleted ? "#d4edda" : "#f8f9fa",
                cursor: "pointer",
              }}
            >
              {category.name}
            </button>

            {isCompleted && hoveredCategory === category._id && (
              <div
                style={{
                  position: "absolute",
                  top: "110%", 
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  whiteSpace: "nowrap",
                  zIndex: 1000,
                }}
              >
                קטגוריה זו הסתיימה בהצלחה.
                <br />
                ציונך באתגר הוא: {result?.totalScore ?? 0}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default CategoriesSection