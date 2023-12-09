import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerapiSlice = createApi({
    reducerPath: 'registerapiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://3a25-2405-201-601e-a044-571-d6f1-9667-3168.ngrok-free.app/api/v1/post',
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: ({ role, firstName, lastName, email, password }) => {
                let payload = {
                    role: role,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                };

                return ({
                    url: '/register',
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

export const { useAddUserMutation } = registerapiSlice;