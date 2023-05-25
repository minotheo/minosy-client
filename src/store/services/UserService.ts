import { createApi } from '@reduxjs/toolkit/query/react';

import { IUser } from "../../models/IUser";

import { setUser } from "../reducers/UserSlice";
import { baseQueryWithInterceptor } from "../query";

export const UserAPI = createApi({
    reducerPath: 'UserAPI',
    baseQuery: baseQueryWithInterceptor,

    tagTypes: ['User'],

    endpoints: (builder) => ({

        getMe: builder.query<IUser, null>({
            query() {
                return {
                    url: 'users/me',
                    method: 'GET',
                };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;

                    dispatch(setUser(response.data));
                } catch (error) {}
            },
        }),

    }),
});