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
      invalidatesTags: ["Challenge", "Question","Category"]
    })
  }),
})

export const { useGetFullQuestionByIdQuery,useCreateQuestionMutation } = questionApi
export default questionApi