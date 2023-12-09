import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const getregisterapiSlice = createApi({
    reducerPath: 'getregisterapiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://3a25-2405-201-601e-a044-571-d6f1-9667-3168.ngrok-free.app/api/v1',
    }),
    tagTypes: ['Get'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/getallregister',
        }),
    }),
});

// Add Lazy after "use" to convert it into Lazy Query hook
export const { useLazyGetUsersQuery } = getregisterapiSlice