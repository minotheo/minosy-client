
import React, {useRef, useState} from 'react';

import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Text, Group, Button, createStyles, rem } from '@mantine/core';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';

import { useCreatePostMutation } from "../../store/services/PostService";

import InputText from "../ui/InputText";

const useStyles = createStyles((theme) => ({
    wrapper: {
        maxWidth: "550px",
        position: 'relative',
        marginBottom: rem(30),
        border: `transparent solid 1px`,
        borderColor: theme.colors.gray,
        borderRadius: "10px",
        padding: theme.spacing.md
    },

    dropzone: {
        borderWidth: rem(1),
        paddingBottom: rem(50),
    },

    icon: {
        color: theme.colorScheme === 'dark'
            ?
            theme.colors.dark[3]
            :
            theme.colors.gray[4],
    },
}));

const PostsForm = () => {

    const { classes, theme } = useStyles();

    const openRef = useRef<() => void>(null);

    const [ text, setText ] = useState("")
    const [ files, setFiles ] = useState([])

    const [ createPost, { isLoading, isSuccess, error, isError } ] =
        useCreatePostMutation();

    const onDropFiles = (images: any) => {
        setFiles(images);
    }

    const onCreatePost = () => {
        const form = new FormData();

        form.append("text", text);

        files.forEach((file) => {
            form.append("images", file);
        });

        createPost(form);
    }

    return (
        <div className={classes.wrapper}>

            <Text fz="lg" mb="xs">
                Post creation
            </Text>

            <InputText type={"text"} label={""} value={text} placeholder={"Enter post text"} onChange={setText}/>

            <Dropzone
                accept={[MIME_TYPES.png,MIME_TYPES.jpeg,]}
                className={classes.dropzone}
                maxSize={30 * 1024 ** 2}
                onDrop={onDropFiles}
                openRef={openRef}
                radius="md"
                mt={"md"}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <Group position="center">
                        <Dropzone.Accept>
                            <IconDownload
                                size={rem(50)}
                                color={theme.colors[theme.primaryColor][6]}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconCloudUpload
                                size={rem(50)}
                                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                        <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                        <Dropzone.Idle>Upload resume</Dropzone.Idle>
                    </Text>
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                        Drag&apos;n&apos;drop files here to upload.
                    </Text>
                </div>
            </Dropzone>

            <Button mt={"md"} radius="md" onClick={onCreatePost}>
                Create post
            </Button>
        </div>
    );
};

export default PostsForm;