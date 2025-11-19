import baseApi from "../../app/baseApi";

const favoriteWordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        getAllFavoriteWords: builder.query({
            query: (data) => ({
                url: `/favoriteWord/?page=${data.page}&limit=${data.limit}&sortBy=${data.sortBy}`,
                method: 'GET'
            }),
            providesTags: ["FavoriteWord"]
        }),

        createFavoriteWord: builder.mutation({
            query: (favoriteWordData) => ({
                url: '/favoriteWord/',
                method: 'POST',
                body: favoriteWordData
            }),
            invalidatesTags: ["FavoriteWord", "Course", "Category"]
        }),

        updateFavoriteWordRaiting: builder.mutation({
            query: (favoriteWordData) => ({
                url: '/favoriteWord/',
                method: 'PUT',
                body: favoriteWordData
            }),
            invalidatesTags: ["FavoriteWord"]
        }),

        deleteFavoriteWord: builder.mutation({
            query: (favoriteWordData) => ({
                url: '/favoriteWord/',
                method: 'DELETE',
                body: favoriteWordData
            }),
            invalidatesTags: ["FavoriteWord"]
        }),
    })
})

export const { useCreateFavoriteWordMutation, useGetAllFavoriteWordsQuery, useDeleteFavoriteWordMutation, useUpdateFavoriteWordRaitingMutation } = favoriteWordApi