import { Instance } from 'app/Interfaces/Instance';
import { Account } from './Account';
import { Comment } from './Comment';


export class Post implements Instance{
    owner: Account;
    comments: Comment[];
    description: string;
    dislikes: Account[];
    id: number;
    likes: Account[];
    mediaUrl: string;
    title: string;

    constructor(owner:Account, comments?: Comment[], description?: string, dislikes?: Account[],
                id?: number, likes?: Account[], mediaUrl?: string, title?: string) {

        this.id = id;
        this.owner = owner;
        this.title = title;
        this.description =  description;
        this.mediaUrl = mediaUrl;
        this.dislikes = dislikes;
        this.likes =  likes;
        this.comments = comments;

    }

    getFilter(): string{
        return this.description;
    }

}
