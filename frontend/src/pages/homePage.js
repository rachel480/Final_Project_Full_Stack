import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllCoursesQuery } from '../features/course/courseApi'
import { selectUser } from '../features/auth/authSlice'
import { useCreateUserProgressMutation } from '../features/userProgress/userProgressApi'
import PageTitle from '../components/pageTitle'
import { Card, CardContent, CardActions, Typography, Button, Alert, CircularProgress, Box } from '@mui/material'

const HomePage = () => {
  const { data: courses, isLoading: isLoadingCourses, error: errorCourses } = useGetAllCoursesQuery()
  const [createUserProgress, { isLoading: isLoadingCreate }] = useCreateUserProgressMutation()
  const user = useSelector(selectUser)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  if (isLoadingCourses || isLoadingCreate)
    return (
      <Box className="flex justify-center items-center h-[60vh]">
        <CircularProgress color="primary" />
      </Box>
    )

  if (errorCourses)
    return (
      <Alert severity="error" className="m-4 text-lg">
        שגיאה בטעינת הקורסים: {errorCourses.message || 'שגיאה לא ידועה'}
      </Alert>
    )

  const handleCreateUserProgress = async (courseId) => {
    setMessage(null)
    try {
      await createUserProgress({ userId: user.id, courseId }).unwrap()
      setMessage({ type: 'success', text: '🎉 נרשמת בהצלחה לקורס! בהצלחה בלמידה 🙌' })
    } catch (err) {
      const errorMsg = err?.data?.message || err?.error || 'שגיאה לא ידועה'
      if (errorMsg.includes('already registered') || errorMsg.includes('קיים כבר')) {
        setMessage({ type: 'info', text: 'ℹ️ אתה כבר רשום לקורס הזה 🙂' })
      } else {
        setMessage({ type: 'error', text: `❌ ${errorMsg}` })
      }
    }
  }

  return (
    <div className="mt-[64px] p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen text-right">
      <PageTitle text={`שלום ${user.fullName || 'משתמש'} 👋`} />

      {message && (
        <Alert
          severity={message.type}
          variant="filled"
          className="my-4 text-lg font-semibold animate-fadeIn"
        >
          {message.text}
        </Alert>
      )}

      <Typography variant="h5" className="text-right mb-6 font-bold text-indigo-700">
        הקורסים שלנו 🎓
      </Typography>

      <div className="grid grid-cols-3 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <Card
            key={course._id}
            className={`rounded-3xl shadow-xl border border-indigo-100 transform transition-all hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-tr hover:from-indigo-50 hover:to-purple-100 duration-300`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="text-right">
              <Typography variant="h6" className="font-bold text-indigo-800 mb-2">
                {course.name}
              </Typography>
              <Typography color="text.secondary" className="mb-1">
                רמה: {course.level}
              </Typography>
              <Typography variant="body2" className="text-gray-700">
                {course.description || 'מידע על הקורס יתווסף בקרוב...'}
              </Typography>
            </CardContent>

            <CardActions className="flex justify-end px-4 pb-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCreateUserProgress(course._id)}
                disabled={isLoadingCreate}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  px: 3,
                  py: 1,
                  background: 'linear-gradient(90deg, #7b5fff, #00c6ff)',
                  transition: '0.3s',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #5b3fff, #00aaff)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                הירשם עכשיו 🚀
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Typography variant="h5" className="text-right mb-2 font-bold text-indigo-700">
          דירוגים ⭐
        </Typography>
        <Typography variant="body1" className="text-gray-600 text-right">
          בקרוב תוכלו לדרג את הקורסים שלמדתם!
        </Typography>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default HomePage

