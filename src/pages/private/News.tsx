import React, { useEffect, useState } from 'react';

import Page from "../../components/page/Page";
import PostsList from "../../components/posts/PostsList";
import PostsForm from "../../components/posts/PostsForm";

import { PostAPI } from "../../store/services/PostService";

const News = () => {

    const [page, setPage] = useState(1);

    const { data: posts, isLoading } = PostAPI.useFetchAllPostsQuery({ page, limit: 10 });

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Page>
            <PostsForm/>
            <PostsList
                posts={posts}
                isLoading={isLoading}
            />
        </Page>
    );
};

export default News;