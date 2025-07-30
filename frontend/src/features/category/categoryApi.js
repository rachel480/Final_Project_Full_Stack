import baseApi from '../../app/baseApi'

const categoryApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getCategoryById:builder.query({
            query:(categoryId)=>({
                url:`/category/getCategory/${categoryId}`,
                method:'GET'
            })
        }),
        getCategoryChallenge:builder.query({
            query:(categoryId)=>({
                url:`/category/${categoryId}/challenge`,
                method:"Get"
            })
        })
    })
})


export const{useGetCategoryByIdQuery,useGetCategoryChallengeQuery}=categoryApi