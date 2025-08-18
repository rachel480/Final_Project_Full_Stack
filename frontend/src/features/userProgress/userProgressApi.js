import baseApi from "../../app/baseApi"

const useProgressApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createUserProgress:builder.mutation({
            query:(userProgressData)=>({
                url:"/userProgress/",
                method:"POST",
                body:userProgressData
            }),
            invalidatesTags: ["UserProgress"]
        }),
        getUserProgressByUser:builder.query({
            query:()=>({
                url:`/userProgress/getUserProgress/`,
                method:'GET'
             }),
            providesTags: ["UserProgress"]
        })

    })
})



export const {useCreateUserProgressMutation,useGetUserProgressByUserQuery}=useProgressApi