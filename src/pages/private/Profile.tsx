import React from 'react';

import Page from "../../components/page/Page";
import UserSection from "../../components/user/UserSection";

import { useAppSelector } from "../../hooks/redux";

const Profile = () => {

    const { user } = useAppSelector(state => state.userReducer)

    return (
        <Page>
            <UserSection
                user={user}
            />
        </Page>
    );
};

export default Profile;