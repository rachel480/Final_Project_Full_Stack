import baseApi from "../../../app/baseApi";

const myWordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMyWords: builder.query({
            query: () => ({
                url: `/myWord/`,
                method: 'GET'
            }),
            providesTags: ["MyWord"]
        }),

        createMyWord: builder.mutation({
            query: (myWordData) => ({
                url: '/myWord/',
                method: 'POST',
                body: myWordData
            }),
            invalidatesTags: ["MyWord", "MyCategory"]
        }),

        updateMyWordRaiting: builder.mutation({
            query: (myWordData) => ({
                url: '/myWord/rating',
                method: 'PUT',
                body: myWordData
            }),
            invalidatesTags: ["MyWord"]
        }),

        updateMyWord: builder.mutation({
            query: (myWordData) => ({
                url: '/myWord/',
                method: 'PUT',
                body: myWordData
            }),
            invalidatesTags: ["MyWord", "MyCategory"]
        }),

        deleteMyWord: builder.mutation({
            query: (myWordData) => ({
                url: '/myWord/',
                method: 'DELETE',
                body: myWordData
            }),
            invalidatesTags: ["MyWord", "MyCategory"]
        }),
    })
})

export const { useGetAllMyWordsQuery, useCreateMyWordMutation, useUpdateMyWordRaitingMutation, useUpdateMyWordMutation, useDeleteMyWordMutation } = myWordApi