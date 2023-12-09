import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginapiSlice = createApi({
    reducerPath: 'loginapiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://3a25-2405-201-601e-a044-571-d6f1-9667-3168.ngrok-free.app/api/v1/post',
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: ({ email, password }) => {
                let payload = {
                    email: email,
                    password: password,
                };

                return ({
                    url: '/login',
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
            },
            invalidatesTags: ['Post']
        }),
    }),
});

export const { useLoginUserMutation } = loginapiSlice;