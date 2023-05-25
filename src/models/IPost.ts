
import { ILike } from "./ILike";
import { IImage } from "./IImage";
import { IRepost } from "./IRepost";
import { IComment } from "./IComment";

export interface IPost {
    id: number;
    text: string;

    userId: number;

    likes: ILike[];
    images: IImage[];
    reposts: IRepost[];
    comments: IComment[];
}