
import React from "react";

import {Avatar, Text, Button, Paper, Loader} from '@mantine/core';

import { useGetProfileByIdQuery } from '../../store/services/ProfileService';

import { IUser } from "../../models/IUser";

interface IUserSection {
    user: IUser | null
}

const UserSection = ({ user }: IUserSection) => {

    const { data: profile, isLoading, isError } =
        useGetProfileByIdQuery( user !== null ? user?.id : -1);

    if(isLoading && profile !== undefined) {
        return <Loader/>
    }

    return (
        <Paper
            radius="md"
            withBorder
            p="lg"
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            })}
        >
            <Avatar src={profile?.avatar} size={120} radius={120} mx="auto" />

            <Text ta="center" fz="lg" weight={500} mt="md">
                {profile?.name}
            </Text>

            <Text ta="center" c="dimmed" fz="sm">
                {user?.username}
            </Text>

            <Text ta="center" c="dimmed" fz="sm">
                {profile?.status}
            </Text>

            <Button variant="default" fullWidth mt="md">
                Send message
            </Button>
        </Paper>
    );
}

export default UserSection;