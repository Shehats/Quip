import { Instance } from "app/Interfaces/Instance";
import { Account } from "app/models/Account";
import { Post } from "app/models/Post";

export class Comment implements Instance{
    id: number;
    account: Account;
    description: string;
    post: Post;
    likes: Account[];
    dislikes: Account[];

    constructor(identifier: number, acc: Account, desc: string, post: Post, like: Account[], disl: Account[]) {
        this.id = identifier;
        this.account = acc;
        this.description = desc;
        this.post = post;
        this.likes = like;
        this.dislikes = disl;
    }

    getFilter(): string {
        return this.description;
    }

}
