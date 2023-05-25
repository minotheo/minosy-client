import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithInterceptor } from "../query";

import { IProfile } from "../../models/IProfile";

export const ProfileAPI = createApi({
    reducerPath: 'ProfileAPI',
    baseQuery: baseQueryWithInterceptor,
    endpoints: (builder) => ({

        getProfileById: builder.query<IProfile, number>({
            query(id: number) {
                return {
                    url: `profiles/${id}`,
                    method: 'GET',
                };
            },
        }),

    }),
});

export const {
    useGetProfileByIdQuery
} = ProfileAPI