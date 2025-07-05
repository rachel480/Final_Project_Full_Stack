import baseApi from '../../app/baseApi'

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData
            })
        }),
        login: builder.mutation({
            query: (userData) => ({
                url: '/auth/login',
                method: 'POST',
                body: userData
            })
        }),
        checkUserNameUniqueness: builder.query({
            query: (userName) => ({
                url: `/user/checkUniquness/${userName}`,
                method: 'GET'
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation,useCheckUserNameUniquenessQuery,useLazyCheckUserNameUniquenessQuery} = authApi