
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
    Container,
    Checkbox,
    Button,
    Anchor,
    Group,
    Paper,
    Title,
    Text,
} from '@mantine/core';

import { useLoginUserMutation } from "../../store/services/AuthService";

import InputText from "../../components/ui/InputText";
import InputPassword from "../../components/ui/InputPassword";

const Login = () => {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ loginUser, { isLoading, isSuccess, error, isError } ] =
        useLoginUserMutation();

    const navigate = useNavigate();

    const onSubmitHandler = (e: any) => {
        e.preventDefault();

        const values = { username, password };

        loginUser(values);
    };

    useEffect(() => {
        if(isSuccess) {
            navigate("/news");
        }
    }, [isSuccess, navigate])

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome back!
            </Title>

            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}

                <Link to={"/signup"}>
                    <Anchor size="sm" component="button">
                        Create account
                    </Anchor>
                </Link>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">

                <InputText
                    type={"text"}
                    label={"Username"}
                    placeholder={"Jack"}

                    value={username}
                    onChange={setUsername}
                />

                <InputPassword
                    label={"Password"}
                    placeholder={"Your password"}

                    value={password}
                    onChange={setPassword}
                />

                <Group position="apart" mt="lg">
                    <Checkbox label="Remember me" />

                    <Link to={"/reset"}>
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Link>
                </Group>

                <Button fullWidth mt="xl" onClick={onSubmitHandler}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}

export default Login;