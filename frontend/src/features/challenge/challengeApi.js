import baseApi from '../../app/baseApi'

const challengeApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getChallengeResults:builder.query({
            query:(id)=>({
                url:`/challenge/${id}/results`,
                method:'GET'
            })
        })
    })
})


export const{useGetChallengeResultsQuery}=challengeApi