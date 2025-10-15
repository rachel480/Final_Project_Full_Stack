import baseApi from "../../app/baseApi";

const wordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getWordById: builder.query({
            query: (wordId) => ({
                url: `/word/${wordId}`,
                method: 'GET'
            }),
            providesTags: ["Word"]
        }),

        createNewWord:builder.mutation({
            query:(wordData)=>({
                url:'/word/',
                method:'POST',
                body:wordData
            }),
            invalidatesTags: [ "Word","Category"]
        })
    })
})

export const { useGetWordByIdQuery, useCreateNewWordMutation} = wordApi