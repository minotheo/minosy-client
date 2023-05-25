
import { ILike } from "./ILike";
import { IRepost } from "./IRepost";
import { IComment } from "./IComment";

export interface IImage {
    id: number;
    url: string;
    description: string;

    userId: number;
    postId: number;
    commentId: number;

    likes: ILike[];
    reposts: IRepost[];
    comments: IComment[];
}
