import baseApi from "../../app/baseApi"

const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: () => ({
                url: '/course',
                method: 'GET',
            })
        }),
        getCourseById:builder.query({
            query:(courseId)=>({
                url:`/course/getCourse/${courseId}`,
                method:"GET"
            })
        }),
        getCourseCategories:builder.query({
            query:(courseId)=>({
                url:`/course/${courseId}/categories`,
                method:'GET'
            })
        }),
        getCourseWords:builder.query({
            query:(courseId)=>({
                url:`/course/${courseId}/words`,
                method:'GET'
            })
        })
    })
})
export const { useGetAllCoursesQuery ,useGetCourseByIdQuery,useGetCourseCategoriesQuery,useGetCourseWordsQuery} = courseApi