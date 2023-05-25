import {combineReducers, configureStore} from "@reduxjs/toolkit";

import { PostAPI } from "./services/PostService";
import { AuthAPI } from "./services/AuthService";
import { UserAPI } from "./services/UserService";
import { ProfileAPI } from "./services/ProfileService";

import userReducer from "./reducers/UserSlice";

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

const rootReducer = combineReducers({
    userReducer,
    [PostAPI.reducerPath]: PostAPI.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [UserAPI.reducerPath]: UserAPI.reducer,
    [ProfileAPI.reducerPath]: ProfileAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(PostAPI.middleware)
                .concat(AuthAPI.middleware)
                .concat(UserAPI.middleware)
                .concat(ProfileAPI.middleware)
    })
}