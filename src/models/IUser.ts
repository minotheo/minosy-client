
import { IProfile } from "./IProfile";

export interface IUser {
    id: number;
    email: string;
    username: string;

    profile: IProfile,
}