const { default: baseApi } = require("../../app/baseApi");

const favoriteWordApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
       createFavoriteWord:builder.mutation({
        query:(favoriteData)=>({
            url:'/favoriteWord/',
            method:'POST',
            body:favoriteData
        }),
        invalidatesTags: ["FavoriteWord"]
       }),
       
       getAllFavoriteWords:builder.query({
        query:(data)=>({
            url:`/favoriteWord/?page=${data.page}&limit=${data.limit}&sortBy=${data.sortBy}`,
            method:'GET'
        }),
        providesTags: ["FavoriteWord"]
       }),
       
       deleteFavoriteWord:builder.mutation({
        query:(favoriteData)=>({
            url:'/favoriteWord/',
            method:'DELETE',
            body:favoriteData
        }),
        invalidatesTags: ["FavoriteWord"]
       }),
       updateFavoriteWordRaiting:builder.mutation({
        query:(favoriteData)=>({
            url:'/favoriteWord/',
            method:'PUT',
            body:favoriteData
        }),
          invalidatesTags: ["FavoriteWord"]
       })
    })
})
export const{useCreateFavoriteWordMutation,useGetAllFavoriteWordsQuery,useDeleteFavoriteWordMutation,useUpdateFavoriteWordRaitingMutation}=favoriteWordApi