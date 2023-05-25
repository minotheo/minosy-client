import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';

import { Link, useNavigate } from "react-router-dom";

import { useRegisterUserMutation } from "../../store/services/AuthService";
import {useEffect, useState} from "react";
import InputText from "../../components/ui/InputText";
import InputPassword from "../../components/ui/InputPassword";

const Register = () => {

    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ registerUser, { isLoading, isSuccess, error, isError } ] =
        useRegisterUserMutation();

    const navigate = useNavigate();

    const onSubmitHandler = (e: any) => {
        e.preventDefault();

        const values = { email, username, password };

        registerUser(values);
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
                Already have an account?{' '}

                <Link to={"/signin"}>
                    <Anchor size="sm" component="button">
                        Sign in
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

                <InputText
                    type={"email"}
                    label={"Email"}
                    placeholder={"you@mantine.dev"}

                    value={email}
                    onChange={setEmail}
                />

                <InputPassword
                    label={"Password"}
                    placeholder={"Your password"}

                    value={password}
                    onChange={setPassword}
                />

                <Group mt="lg">
                    <Checkbox label="I agree with" />

                    <Anchor component="button" size="sm">
                        terms of service
                    </Anchor>
                </Group>

                <Button fullWidth mt="xl" onClick={onSubmitHandler}>
                    Sign up
                </Button>
            </Paper>
        </Container>
    );
}

export default Register;