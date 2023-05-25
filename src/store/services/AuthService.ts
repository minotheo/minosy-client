import { createApi } from '@reduxjs/toolkit/query/react';

import { UserAPI } from './UserService';

import { ILoginBody } from "./types/ILoginBody";
import { IAuthResult } from "./types/IAuthResult";
import { IRegisterBody } from "./types/IRegisterBody";

import { setUser } from "../reducers/UserSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import { API_URL } from "../http";

export const AuthAPI = createApi({
    reducerPath: 'AuthAPI',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),

    endpoints: (builder) => ({

        registerUser: builder.mutation<IAuthResult, IRegisterBody>({
            query(data) {
                return {
                    url: 'auth/signup',
                    method: 'POST',
                    body: data,
                };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem("accessToken", result.data.accessToken);
                    localStorage.setItem("refreshToken", result.data.refreshToken);

                    await dispatch(UserAPI.endpoints.getMe.initiate(null));
                } catch (error) {}
            },
        }),

        loginUser: builder.mutation<IAuthResult, ILoginBody>({
            query(data) {
                return {
                    url: 'auth/signin',
                    method: 'POST',
                    body: data,
                };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem("accessToken", result.data.accessToken);
                    localStorage.setItem("refreshToken", result.data.refreshToken);

                    await dispatch(UserAPI.endpoints.getMe.initiate(null));
                } catch (error) {}
            },
        }),

        refreshUser: builder.mutation<IAuthResult, null>({
            query() {

                const refreshToken = localStorage.getItem("refreshToken")

                return {
                    url: 'auth/refresh',
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`
                    },
                };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem("accessToken", result.data.accessToken);
                    localStorage.setItem("refreshToken", result.data.refreshToken);

                    await dispatch(UserAPI.endpoints.getMe.initiate(null));
                } catch (error) {}
            },
        }),

        logoutUser: builder.mutation<void, void>({
            query() {
                return {
                    url: 'auth/logout',
                };
            },

            async onQueryStarted(args, { dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;

                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");

                    await dispatch(setUser(null));
                } catch (error) {

                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");

                    await dispatch(setUser(null));
                }
            },
        }),

    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useRefreshUserMutation,
    useLogoutUserMutation,
} = AuthAPI;