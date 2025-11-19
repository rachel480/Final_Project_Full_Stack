import baseApi from "../../app/baseApi";

const recommendionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getApprovedRecommendions: builder.query({
            query: () => ({
                url: '/recommendion/approved',
                method: 'GET'
            }),
            providesTags: ["Recommendion"]
        }),

        getAllRecommendions: builder.query({
            query: () => ({
                url: '/recommendion/',
                method: 'GET'
            }),
            providesTags: ["Recommendion"]
        }),
        
        createRecommendion: builder.mutation({
            query: (data) => ({
                url: "/recommendion/",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Recommendion"]
        }),

        approveRecommendion: builder.mutation({
            query: (id) => ({
                url: "/recommendion/approve",
                method: "PUT",
                body: { id }
            }),
            invalidatesTags: ["Recommendion"]
        }),

        deleteRecommendion: builder.mutation({
            query: (id) => ({
                url: "/recommendion/",
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: ["Recommendion"]
        }),

    })
})

export const {useGetApprovedRecommendionsQuery,useGetAllRecommendionsQuery,useCreateRecommendionMutation,useApproveRecommendionMutation,useDeleteRecommendionMutation} = recommendionApi
