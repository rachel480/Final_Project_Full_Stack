import baseApi from '../../app/baseApi'

const wordApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getWordsByCategory:builder.query({
            query:(categoryName)=>({
                url:`/word/getByCategory/${categoryName}`,
                method:'GET'
            })
        })

    })
})

export const{useGetWordsByCategoryQuery}=wordApi