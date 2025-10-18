import baseApi from "../../app/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: '/user/',
                method: 'GET'
            }),
            providesTags: ["User"]
        }),

        getSingleUser: builder.query({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: 'GET'
            }),
            providesTags: ["User"]
        }),

        createNewUser: builder.mutation({
            query: (userData) => ({
                url: "/user/",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["User"]
        }),

        updateUserByAdmin: builder.mutation({
            query: (userData) => ({
                url: "/user/admin",
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["User"]
        }),
        deleteUserByAdmin: builder.mutation({
            query: (id) => ({
                url: "/user/",
                method: "DELETE",
                body: {id} ,
            }),
            invalidatesTags: ["User"]
        }),

    })
})

export const { useGetAllUsersQuery, useGetSingleUserQuery, useCreateNewUserMutation, useUpdateUserByAdminMutation,useDeleteUserByAdminMutation} = userApi