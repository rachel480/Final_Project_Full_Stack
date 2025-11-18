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

        createNewWord: builder.mutation({
            query: (wordData) => ({
                url: '/word/',
                method: 'POST',
                body: wordData
            }),
            invalidatesTags: ["Word", "Category"]
        }),

        updateWord: builder.mutation({
    query: (data) => {
        const formData = new FormData()

        formData.append("id", data.id)
        formData.append("word", data.word)
        formData.append("translation", data.translation)
        formData.append("categoryName", data.categoryName)

        // only append file if present
        if (data.img) {
            formData.append("img", data.img)
        }

        return {
            url: '/word/',
            method: 'PUT',
            body: formData
        }
    },
    invalidatesTags: ["Word", "Category"]
}),

        deleteword: builder.mutation({
            query: (data) => ({
                url: "/word/",
                method: 'DELETE',
                body: data,
            }),
            invalidatesTags: ["Word", "Question", "Category"]
        }),
    })

})

export const { useGetWordByIdQuery, useCreateNewWordMutation, useDeletewordMutation, useUpdateWordMutation } = wordApi