import baseApi from '../../app/baseApi'

const categoryApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getCategoryById:builder.query({
            query:(categoryId)=>({
                url:`/category/${categoryId}`,
                method:'GET'
            }),
             providesTags:["Category"]
        }),
        getCategoryChallenge:builder.query({
            query:(categoryId)=>({
                url:`/category/${categoryId}/challenge`,
                method:"Get"
            }),
             providesTags:["Category"]
        }),
        getCategoryWords:builder.query({
            query:(categoryId)=>({
                url:`/category/${categoryId}/words`,
                method:'GET'
            }),
            providesTags:["Category"]
        }),
    })
})


export const{useGetCategoryByIdQuery,useGetCategoryChallengeQuery,useGetCategoryWordsQuery}=categoryApi