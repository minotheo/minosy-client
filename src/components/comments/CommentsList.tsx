import React from 'react';

import {createStyles, Group, Skeleton, Text} from "@mantine/core"

import CommentsItem from "./CommentsItem";

import { IComment } from "../../models/IComment";

const useStyles = createStyles(() => ({
    postsList: {
    },
}));

interface ICommentsLists {
    comments: IComment[] | undefined;
    isLoading: boolean;
}

const CommentsList = ({ comments, isLoading }: ICommentsLists) => {

    const { classes } = useStyles();

    if(isLoading) {
        return (
            <Group>
                <Skeleton height={50} circle mb="xl" />
            </Group>
        );
    }

    if( comments === undefined || !comments.length ) {
        return <Text>There is no comments.</Text>;
    }

    return (
        <div className={classes.postsList}>
            {
                comments.map((item) =>
                    <CommentsItem
                        item={item}
                        isLoading={false}
                    />
                )
            }
        </div>
    );
};

export default CommentsList;