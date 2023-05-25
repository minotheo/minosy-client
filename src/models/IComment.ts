
import { IUser } from "./IUser";
import { ILike } from "./ILike";
import { IImage } from "./IImage";

export interface IComment {
    id: number;
    content: string;

    userId: number;
    postId: number;

    likes: ILike[];
    images: IImage[];

    user: IUser,
}