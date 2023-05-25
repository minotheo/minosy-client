import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IPost } from "../../models/IPost";

import { baseQueryWithInterceptor } from "../query";

export const PostAPI = createApi({

    tagTypes: ['Post'],
    reducerPath: "PostAPI",

    baseQuery: baseQueryWithInterceptor,

    endpoints: (build) => ({

        fetchAllPosts: build.query<IPost[], { page: number; limit: number }>({
            query: ({ page, limit }) => `posts?page=${page}&limit=${limit}`,
        }),

        createPost: build.mutation<IPost, FormData>({
            query: (postBody: FormData) => ({
                url: "/posts",
                method: "POST",
                body: postBody
            })
        }),

        updatePost: build.mutation<IPost, string>({
            query: (postBody: string) => ({
                url: "/posts",
                method: "PUT",
                body: {
                    text: postBody
                },
            })
        }),

        removePost: build.mutation<any, number>({
            query: (postId: number) => ({
                url: "/posts",
                method: "DELETE",
                body: {
                    text: postId
                }
            })
        }),

    })
})

export const {
    useFetchAllPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useRemovePostMutation,
} = PostAPI;