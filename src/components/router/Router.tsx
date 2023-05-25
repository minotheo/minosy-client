import React, {useEffect} from 'react';

import { useAppSelector } from "../../hooks/redux";

import {
    BrowserRouter,
    Navigate,
    Routes,
    Route, useNavigate,
} from "react-router-dom";

import News from "../../pages/private/News";
import Music from "../../pages/private/Music";
import Videos from "../../pages/private/Videos";
import Photos from "../../pages/private/Photos";
import Groups from "../../pages/private/Groups";
import Friends from "../../pages/private/Friends";
import Profile from "../../pages/private/Profile";
import Messages from "../../pages/private/Messages";
import Login from "../../pages/authorization/Login";
import Register from "../../pages/authorization/Register";
import Recovery from "../../pages/authorization/Recovery";

import { useRefreshUserMutation } from "../../store/services/AuthService";
import {Loader} from "@mantine/core";

const privateRoutes =
[
    { route: "news", element: <News/> },
    { route: "music", element: <Music/> },
    { route: "videos", element: <Videos/> },
    { route: "photos", element: <Photos/> },
    { route: "groups", element: <Groups/> },
    { route: "friends", element: <Friends/> },
    { route: "profile", element: <Profile /> },
    { route: "messages", element: <Messages/> },
];

const Router = () => {

    const { user } = useAppSelector(state => state.userReducer)

    const [ refreshUser, { isLoading, isSuccess, isError } ] =
        useRefreshUserMutation();

    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');

        if(refreshToken !== null && user === null && !isLoading && !isError && !isSuccess) {
            refreshUser(null);
        }
    });

    const routes = privateRoutes.map((item, index) =>
        <Route
            key={index}
            path={item.route}
            element={
                (user !== null) ? item.element : <Navigate to="/signin" replace />
            }
        />
    );

    return (
        <BrowserRouter>
            <Routes>
                { routes }

                <Route path={"signin"} element={(user === null) ? <Login/> : <Navigate to="/news" replace /> } />
                <Route path={"signup"} element={(user === null) ? <Register/> : <Navigate to="/news" replace /> } />
                <Route path={"reset"} element={(user === null) ? <Recovery/> : <Navigate to="/news" replace /> } />

                <Route path='*' element={<Navigate to='/signin' replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;