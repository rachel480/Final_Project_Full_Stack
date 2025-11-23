import { useParams, useNavigate } from "react-router-dom"
import { useGetCourseCategoriesQuery } from "./courseApi"
import { useGetUserProgressByUserQuery } from "../userProgress/userProgressApi"
import { useState } from "react"
import { Card, CardActionArea, CardContent, Typography, LinearProgress, Tooltip } from "@mui/material"
import LoadingSpinner from "../../components/loadingSpinner"
import ErrorMessage from "../../components/errorMessage"

const rainbowColors = [
  "from-pink-400 to-red-500",
  "from-purple-400 to-indigo-500",
  "from-green-400 to-lime-500",
  "from-yellow-300 to-orange-400",
  "from-teal-400 to-cyan-500",
]

const CategoriesSection = () => {
  const navigate = useNavigate()

  const { courseId } = useParams()
  const { data: categories, isLoading, error } = useGetCourseCategoriesQuery(courseId)
  const { data: userProgress, isLoading: LoadingUserProgress } = useGetUserProgressByUserQuery()
  const [hoveredCategory, setHoveredCategory] = useState(null)

  if (isLoading || LoadingUserProgress) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"} />

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8 px-4 mr-[3rem] max-md:mr-0 max-md:mt-4">
      {categories.map((category, index) => {
        const isCompleted = userProgress?.completedCategories?.some(
          (completed) => completed._id === category._id
        )
        const result = userProgress?.challengeResults?.find(
          (r) => r.challenge?._id.toString() === category.challenge
        )

        const gradient = rainbowColors[index % rainbowColors.length]

        return (
          <Tooltip
            key={category._id}
            title={
              isCompleted
                ? `הקטגוריה הושלמה! הציון שלך: ${result?.totalScore ?? 0}`
                : "לחצו כדי להתחיל ללמוד!"
            }
            arrow
            placement="top"
          >
            <Card
              onMouseEnter={() => setHoveredCategory(category._id)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="w-80 max-md:w-80 transform transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg rounded-2xl border-0 overflow-hidden"
            >
              <div className={`h-32 max-md:h-24 bg-gradient-to-r ${gradient} flex items-center justify-center`}>
                <span className="text-3xl max-md:text-2xl animate-bounce text-white">
                  {isCompleted ? "✅" : "🟢"}
                </span>
              </div>

              <CardActionArea onClick={() => navigate(`${category._id}`)}>
                <CardContent className="flex flex-col items-center justify-center py-4 px-4 bg-white">
                  <Typography
                    variant="h6"
                    className="text-gray-800 font-bold text-center truncate max-md:text-lg"
                  >
                    {category.name}
                  </Typography>

                  {isCompleted && hoveredCategory === category._id && (
                    <Typography
                      variant="body2"
                      className="text-green-700 mt-2 text-center max-md:text-sm"
                    >
                      סיימת! נקודות: {result?.totalScore ?? 0}
                    </Typography>
                  )}

                  <div className="w-full mt-3">
                    <LinearProgress
                      variant="determinate"
                      value={isCompleted ? 100 : 0}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#eee",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 5,
                          backgroundColor: isCompleted ? "#34d399" : "#3b82f6",
                        },
                      }}
                    />
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Tooltip>
        )
      })}
    </div>
  )
}

export default CategoriesSection
