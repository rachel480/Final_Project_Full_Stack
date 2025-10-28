import baseApi from '../../app/baseApi'

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryById: builder.query({
            query: (categoryId) => ({
                url: `/category/${categoryId}`,
                method: 'GET'
            }),
            providesTags: ["Category"]
        }),

        getFullCategoryById: builder.query({
            query: (categoryId) => ({
                url: `/category/${categoryId}/full`,
                method: 'GET'
            }),
            providesTags: ["Category"]
        }),

        getCategoryChallenge: builder.query({
            query: (categoryId) => ({
                url: `/category/${categoryId}/challenge`,
                method: 'GET'
            }),
            providesTags: ["Category"]
        }),

        getCategoryWords: builder.query({
            query: (categoryId) => ({
                url: `/category/${categoryId}/words`,
                method: 'GET'
            }),
            providesTags: ["Category"]
        }),

        getAllCategories: builder.query({
            query: () => ({
                url: `/category/`,
                method: 'GET'
            }),
            providesTags: ["Category"]
        }),

        createFullCategorySimple: builder.mutation({
            query: (data) => ({
                url: "/category/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category","Course"]
        }),

        deleteCategory:builder.mutation({
            query: (data) => ({
                url: "/category/",
                method: 'DELETE',
                body: data,
            }),
            invalidatesTags: ["Category","Course"]
        })
    })
})

export const { useGetCategoryByIdQuery,useCreateFullCategorySimpleMutation, useGetFullCategoryByIdQuery, useGetCategoryChallengeQuery, useGetCategoryWordsQuery, useGetAllCategoriesQuery ,useDeleteCategoryMutation} = categoryApi