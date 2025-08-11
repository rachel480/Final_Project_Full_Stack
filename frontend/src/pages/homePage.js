import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllCoursesQuery } from '../features/course/courseApi'
import { selectUser } from '../features/auth/authSlice'
import { useCreateUserProgressMutation } from '../features/userProgress/userProgressApi'

const HomePage = () => {
  const { data: courses, isLoading: isLoadingCourses, error: errorCourses } = useGetAllCoursesQuery()
  const [createUserProgress, { isLoading: isLoadingCreate }] = useCreateUserProgressMutation()

  const user = useSelector(selectUser)
  console.log("Redux user:", user)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (isLoadingCourses || isLoadingCreate) return <p>Loading...</p>
  if (errorCourses) return <p>Error loading courses: {errorCourses.message || 'Unknown error'}</p>

  const handleCreateUserProgress = async (courseId) => {
    setMessage(null)
    try {
      await createUserProgress({ userId: user.id, courseId }).unwrap()
      setMessage({ type: 'success', text: 'signed up successfully' })
    } catch (err) {
      const errorMsg =
        err?.data?.message ||
        err?.error ||
        'unknown error'
      setMessage({ type: 'error', text: errorMsg })
    }
  }

  return (
    <div>
      <h1>Home Page</h1>

      {message && (
        <div
          style={{
            color: message.type === 'error' ? 'red' : 'green',
            marginBottom: '1rem',
          }}
        >
          {message.text}
        </div>
      )}

      <div>
        <h2>Courses</h2>
        {courses.map((course) => (
          <div key={course._id} style={{ marginBottom: '1rem' }}>
            <p>Level: {course.level}</p>
            <p>About the course</p>
            <button onClick={() => handleCreateUserProgress(course._id)} disabled={isLoadingCreate}>
              Sign up to course
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2>דירוגים</h2>
      </div>
    </div>
  )
}

export default HomePage