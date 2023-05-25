
import React from 'react';

import {
    createStyles,
    getStylesRef,
    rem,
    ActionIcon,
    Skeleton,
    Group,
    Image,
    Card,
    Text,
} from '@mantine/core';

import { Carousel } from '@mantine/carousel';

import { IPost } from "../../models/IPost";
import { API_URL } from "../../store/http";

import {BiLike, BiRepost} from "react-icons/bi";

const useStyles = createStyles((theme) => ({
    post: {
        '&:not(:last-child)': {
            marginBottom: theme.spacing.md
        },
    },

    action: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0],
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        }),
    },

    carousel: {
        marginTop: theme.spacing.md,

        '&:hover': {
            [`& .${getStylesRef('carouselControls')}`]: {
                opacity: 1,
            },
        },
    },

    carouselControls: {
        ref: getStylesRef('carouselControls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    carouselIndicator: {
        width: rem(4),
        height: rem(4),
        transition: 'width 250ms ease',

        '&[data-active]': {
            width: rem(16),
        },
    },
}));

interface IPostsItem {
    item: IPost;
    isLoading: boolean;
}

const PostsItem = ({ item, isLoading }: IPostsItem) => {

    const { classes } = useStyles();

    if(isLoading) {
        return (
            <Card radius="md" withBorder padding="xl" className={classes.post}>
                <Skeleton height={50} circle mb="xl" />
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
                <Skeleton height={250} mt={16} width="100%" radius="md" />
            </Card>
        );
    }

    const images = item.images !== undefined ? item.images.map((img, index) =>
        <Carousel.Slide key={index}>
            <Image src={API_URL + img.url} height={220} radius={"md"} />
        </Carousel.Slide>
    ) : [];

    return (
        <Card radius="md" withBorder padding="xl" className={classes.post}>

            <Text fz="sm" c="dimmed">
                { item.text }
            </Text>

            {
                images.length ?
                    <Carousel
                        withIndicators
                        loop
                        classNames={{
                            root: classes.carousel,
                            controls: classes.carouselControls,
                            indicator: classes.carouselIndicator,
                        }}
                    >
                        { images }
                    </Carousel> : ""
            }

            <Group mt={"md"}>
                <ActionIcon className={classes.action}>
                    <BiLike/>
                </ActionIcon>

                <ActionIcon className={classes.action}>
                    <BiRepost/>
                </ActionIcon>
            </Group>
        </Card>
    );
};

export default PostsItem;