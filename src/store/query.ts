
import axios from "axios";

import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/react";

import { logout } from "./reducers/UserSlice";

import { API_URL } from "./http";

export const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken");

        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers;
    }
});

export const baseQueryWithInterceptor: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async ( args, api, extraOptions ) => {

        let result = await baseQuery(args, api, extraOptions);

        if(result.error && result.error.status === 401) {

            axios({
                method: 'GET',
                url: `${API_URL}auth/refresh`,

                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("refreshToken")}`
                },

            }).then(async (response) => {
                console.log("success");

                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem("refreshToken", response.data.refreshToken)

                result = await baseQuery(args, api, extraOptions)
            }).catch(() =>{
                console.log("error");

                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")

                return api.dispatch(logout());
            });
        }

        return result
    };