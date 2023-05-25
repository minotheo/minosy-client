import React from 'react';

import {
    Skeleton,
    Avatar,
    Group,
    Text,
} from "@mantine/core";

import { IComment } from "../../models/IComment";

interface IUserSection {
    item: IComment;
    date: string;
    isLoading: boolean;
}

const UserSection = ({ item, date, isLoading }: IUserSection) => {

    if(isLoading) {
        return (
            <Group>
                <Skeleton height={50} circle mb="xl" />
            </Group>
        );
    }

    return (
        <Group>
            <Avatar src={item.user.profile.avatar} alt={item.user.profile.name} radius="xl" />

            <div>
                <Text fz="sm">
                    {item.user.profile.name}
                </Text>

                <Text fz="xs" c="dimmed">
                    {date}
                </Text>
            </div>
        </Group>
    );
};

export default UserSection;