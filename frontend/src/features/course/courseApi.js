import baseApi from '../../app/baseApi'

const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: () => ({
                url: '/course',
                method: 'GET',
            }),
            providesTags: ["Course"]
        }),

        getAllCoursesByAdmin: builder.query({
            query: () => ({
                url: '/course/admin',
                method: 'GET'
            }),
            providesTags: ["Course"]
        }),

        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/course/${courseId}`,
                method: 'GET'
            }),
            providesTags: ["Course"]
        }),

        getFullCourseById: builder.query({
            query: (courseId) => ({
                url: `/course/${courseId}/full`,
                method: 'GET'
            }),
            providesTags: ["Course"]
        }),

        getCourseCategories: builder.query({
            query: (courseId) => ({
                url: `/course/${courseId}/categories`,
                method: 'GET'
            }),
            providesTags: ["Course"]
        }),

        getCourseWords: builder.query({
            query: (courseId) => ({
                url: `/course/${courseId}/words`,
                method: 'GET'
            }),
            providesTags: ["Course"]
        }),

        createCourse: builder.mutation({
            query: (courseData) => ({
                url: '/course',
                method: 'POST',
                body: courseData,
            }),
            invalidatesTags: ["Course"]
        }),

        updateCourse: builder.mutation({
            query: (courseData) => ({
                url: '/course',
                method: 'PUT',
                body: courseData,
            }),
            invalidatesTags: ["Course"]
        }),

        deleteCourse: builder.mutation({
            query: (courseData) => ({
                url: '/course',
                method: 'DELETE',
                body: courseData,
            }),
            invalidatesTags: ["Course"]
        }),

        createFullCourseSimple: builder.mutation({
            query: (wizard) => ({
                url: "/course/createFullSimple",
                method: "POST",
                body:  wizard , 
            }),
            invalidatesTags: ["Course"]
        })

    }),

})

export const { useGetAllCoursesQuery, useGetAllCoursesByAdminQuery, useGetCourseByIdQuery,useGetFullCourseByIdQuery, useGetCourseCategoriesQuery, useGetCourseWordsQuery, useCreateCourseMutation, useUpdateCourseMutation, useDeleteCourseMutation,useCreateFullCourseSimpleMutation} = courseApi