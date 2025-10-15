import baseApi from '../../app/baseApi'

const challengeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getChallengeResults: builder.query({
            query: (id) => ({
                url: `/challenge/${id}/results`,
                method: 'GET'
            }),
            providesTags: ["Challenge"]
        }),

        getFullChallengeById: builder.query({
            query: (id) => ({
                url: `/challenge/${id}/full`,
                method: 'GET'
            }),
            providesTags: ["Challenge"]
        }),

        createFullChallenge: builder.mutation({
            query: (data) => ({
                url: "/challenge/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category", "Challenge"]
        })

    })
})

export const { useGetChallengeResultsQuery, useGetFullChallengeByIdQuery ,useCreateFullChallengeMutation} = challengeApi