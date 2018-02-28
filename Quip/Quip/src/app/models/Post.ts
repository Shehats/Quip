import { Instance } from "app/Interfaces/Instance";
import { Comment } from "app/models/Comment";

export class Post implements Instance{
    parentId: number;
    id: number;
    media: string;
    description: string;
    likes: number;
    dislikes: number;
    comments : Comment[];

    constructor(parentId: number, ident: number, desc: string, like: number, disl: number, comments: Comment[], medi?: string) {
        this.parentId = parentId;
        this.id = ident;
        this.media = (medi) ? medi: '';
        this.description = desc;
        this.likes = like;
        this.dislikes = disl;
        this.comments = comments;
    }

    getFilter(): string{
        return this.description;
    }

}
