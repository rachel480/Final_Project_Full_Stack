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

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/forgot",
                method: "POST",
                body:  data,
            }),
        }),

        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: `/auth/reset/${token}`,
                method: "POST",
                body: { password },
            }),
        }),
        
        checkUserNameUniqueness: builder.query({
            query: (userName) => ({
                url: `/user/checkUniquness/${userName}`,
                method: 'GET'
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation,useForgotPasswordMutation,useResetPasswordMutation, useCheckUserNameUniquenessQuery, useLazyCheckUserNameUniquenessQuery } = authApi