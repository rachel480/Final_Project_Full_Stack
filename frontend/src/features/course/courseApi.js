import baseApi from "../../app/baseApi"

const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: () => ({
                url: '/course',
                method: 'GET',
            }),
             providesTags: ["Course"]
        }),
        getCourseById:builder.query({
            query:(courseId)=>({
                url:`/course/getCourse/${courseId}`,
                method:"GET"
            }),
            providesTags: ["Course"]
        }),
        getCourseCategories:builder.query({
            query:(courseId)=>({
                url:`/course/${courseId}/categories`,
                method:'GET'
            }),
            providesTags: ["Course"]
        }),
        getCourseWords:builder.query({
            query:(courseId)=>({
                url:`/course/${courseId}/words`,
                method:'GET'
            }),
            providesTags: ["Course"]
        })
    })
})
export const { useGetAllCoursesQuery ,useGetCourseByIdQuery,useGetCourseCategoriesQuery,useGetCourseWordsQuery} = courseApi