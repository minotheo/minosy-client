import React from 'react';

import { createStyles } from "@mantine/core";

import Navbar from "../navbar/Navbar";

const useStyles = createStyles((theme) => (
    {
        wrapper: {
            width: "100%",
            display: "flex",
            overflow: "hidden"
        },

        container: {
            width: "100%",
            maxHeight: "100vh",
            flex: "1 1 auto",
            overflowX: "hidden",
            overflowY: "scroll",
            padding: theme.spacing.md,
        },
    }
));

interface IPage {
    children: React.ReactNode,
}

const Page = ({ children }: IPage) => {

    const { classes, cx } = useStyles();

    return (
        <div
            className={cx(classes.wrapper)}
        >
            <Navbar/>

            <div
                className={cx(classes.container)}
            >
                {children}
            </div>
        </div>
    );
};

export default Page;