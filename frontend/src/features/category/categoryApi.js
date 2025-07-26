import baseApi from '../../app/baseApi'

const categoryApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getCategoryById:builder.query({
            query:(categoryId)=>({
                url:`/category/getCategory/${categoryId}`,
                method:'GET'
            })
        })
    })
})

export const{useGetCategoryByIdQuery}=categoryApi