import baseApi from "../../../app/baseApi";

const myCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMyCategoris:builder.query({
            query:()=>({
                url:'/myCategory/',
                method:'GET'
            }),
            providesTags: ["MyCategory"]
        }),

        
        getWordsOfCategory:builder.query({
            query:(categoryId)=>({
                url:`/myCategory/${categoryId}/words`,
                method:'GET'
            }),
            providesTags: (result, error, categoryId) => [{ type: "MyCategory", id: categoryId }]
        }),

        createMyCategory:builder.mutation({
            query:(myCategoryData)=>({
                url:'/myCategory/',
                method:'POST',
                body:myCategoryData
            }),
            invalidatesTags: ["MyCategory"]
        }),

        updateMyCategory:builder.mutation({
            query:(myCategoryData)=>({
                url:'/myCategory/',
                method:'PUT',
                body:myCategoryData
            }),
            invalidatesTags: ["MyCategory"]
        }),

        deleteMyCategory:builder.mutation({
            query:(myCategoryData)=>({
                url:'/myCategory/',
                method:'DELETE',
                body:myCategoryData
            }),
            invalidatesTags: ["MyCategory"]
        })
    })
})

export const {useGetAllMyCategorisQuery,useGetWordsOfCategoryQuery,useCreateMyCategoryMutation,useUpdateMyCategoryMutation,useDeleteMyCategoryMutation}=myCategoryApi