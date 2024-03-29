import React from 'react';

import {
    createStyles,
    getStylesRef,
    rem,
    Navbar,
    Title,
    Group,
    Code,
} from '@mantine/core';

import {
    BiImage, BiLogOut,
    BiMessageSquare,
    BiMusic,
    BiNews,
    BiVideo,
} from "react-icons/bi";

import {
    BsPeople,
} from "react-icons/bs";

import { Link } from "react-router-dom";
import {useLogoutUserMutation, useRefreshUserMutation} from "../../store/services/AuthService";

const useStyles = createStyles((theme) => ({
    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },
    footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },

        '&:not(:last-child)': {
            marginBottom: "6px",
        },
    },
    linkIcon: {
        width: "18px",
        height: "18px",
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },
}));

const data = [
    { id: 0, link: '/profile', label: 'Профиль', icon: BsPeople },
    { id: 1, link: '/news', label: 'Новости', icon: BiNews },
    { id: 2, link: '/friends', label: 'Друзья', icon: BsPeople },
    { id: 3, link: '/messages', label: 'Сообщения', icon: BiMessageSquare },
    { id: 4, link: '/groups', label: 'Сообщества', icon: BsPeople },
    { id: 5, link: '/photos', label: 'Фотографии', icon: BiImage },
    { id: 6, link: '/music', label: 'Музыка', icon: BiMusic },
    { id: 7, link: '/videos', label: 'Видео', icon: BiVideo },
];

const NavbarSimple = () => {
    const { classes, cx } = useStyles();

    const [ logoutUser ] =
        useLogoutUserMutation();

    const links = data.map((item) => (
        <Link
            className={cx(classes.link)}
            key={item.label}
            to={item.link}
        >
            <item.icon className={classes.linkIcon}/>
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <Navbar width={{ sm: 300 }} p="md">
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Title order={3} fw={"700"}>Minosy</Title>
                    <Code sx={{ fontWeight: 700 }}>v0.0.1</Code>
                </Group>

                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <p className={classes.link} onClick={(event) => {
                    event.preventDefault();
                    logoutUser();
                }}>
                    <BiLogOut className={classes.linkIcon} style={{marginRight: "12px"}}/>
                    <span>Выход</span>
                </p>
            </Navbar.Section>
        </Navbar>
    );
}

export default NavbarSimple;