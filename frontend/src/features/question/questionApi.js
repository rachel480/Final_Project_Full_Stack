import baseApi from '../../app/baseApi'

const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFullQuestionById: builder.query({
      query: (questionId) => ({
        url: `/question/${questionId}/full`,
        method: "GET",
      }),
      providesTags: ["Question"],
    }),

    createQuestion: builder.mutation({
      query: (data) => ({
        url: "/question/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Challenge", "Question", "Category"]
    }),

    deleteQuestion: builder.mutation({
      query: (data) => ({
        url: "/question/",
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ["Question", "Challenge","Category"]
    }),
    updateQuestion: builder.mutation({
      query: (data) => ({
        url: `/question/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Question", "Challenge"],
    })
  }),
})

export const { useGetFullQuestionByIdQuery, useCreateQuestionMutation,useDeleteQuestionMutation,useUpdateQuestionMutation } = questionApi
export default questionApi