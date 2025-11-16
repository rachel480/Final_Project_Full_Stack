import baseApi from "../../app/baseApi";

const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        getAllMessages: builder.query({
            query: () => ({
                url:'/contact/',
                method:"GET"
            }),
            providesTags: ["Contact"]
        }),
        
        addContactMessage: builder.mutation({
            query: (data) => ({
                url: "/contact/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Contact"]
        }),

        deleteMessage: builder.mutation({
            query: (data) => ({
                url: '/contact/',
                method: 'DELETE',
                body: data,
            }),
            invalidatesTags: ["Contact"]
        }),
        
    }),
})

export const {useGetAllMessagesQuery, useAddContactMessageMutation,useDeleteMessageMutation } = contactApi
