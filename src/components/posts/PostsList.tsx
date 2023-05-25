import React from 'react';

import {
    createStyles,
    Text
} from "@mantine/core"

import PostsItem from "./PostsItem";

import { IPost } from "../../models/IPost";

const useStyles = createStyles(() => ({
    postsList: {
        maxWidth: "550px",
    },
}));

interface IPostsLists {
    posts: IPost[] | undefined;
    isLoading: boolean;
}

const PostsList = ({ posts, isLoading  }: IPostsLists) => {

    const { classes } = useStyles();

    if( posts === undefined || !posts.length ) {
        return <Text>There is no posts.</Text>;
    }

    return (
        <div className={classes.postsList}>
            {
                posts.map((item, index) =>
                    <PostsItem
                        key={index}
                        item={item}
                        isLoading={false}
                    />
                )
            }
            {isLoading && <Text>Loading more posts...</Text>}
        </div>
    );
};

export default PostsList;