
import React from 'react';

import {
    createStyles,
    rem,
    TypographyStylesProvider,
    Skeleton,
    Image,
    Group,
    Paper,
    Text,
} from '@mantine/core';

import { Carousel } from '@mantine/carousel';

import { IComment } from "../../models/IComment";
import { API_URL } from "../../store/http";

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    },

    body: {
        paddingLeft: rem(54),
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },
}));


interface ICommentsList {
    item: IComment;
    isLoading: boolean;
}

const CommentsItem = ({ item, isLoading }: ICommentsList) => {

    const { classes } = useStyles();

    if(isLoading) {
        return (
            <Paper withBorder radius="md" className={classes.comment}>
                <Skeleton height={50} circle mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </Paper>
        );
    }

    const images = item.images !== undefined ? item.images.map((img, index) =>
        <Carousel.Slide key={index}>
            <Image src={API_URL + img.url} height={220} radius={"md"} />
        </Carousel.Slide>
    ) : [];

    return (
        <Paper withBorder radius="md" className={classes.comment}>
            <Group>

            </Group>

            <TypographyStylesProvider className={classes.body}>
                <Text>{ item.content }</Text>
            </TypographyStylesProvider>
        </Paper>
    );
};

export default CommentsItem;