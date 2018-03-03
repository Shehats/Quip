import { Instance } from 'app/Interfaces/Instance';
import { Account } from './Account';
import { Comment } from './Comment';


export class Post implements Instance{
    comments: Comment[];
    description: string;
    dislikes: Account[];
    id: number;
    likes: Account[];
    mediaUrl: string;
    title: string;
//Java pojo for reference.
    // private Long id;
    // private Account owner;
    // private String title;
    // private String description;
    // private String mediaUrl;
    // private List<Account> likes;
    // private List<Account> dislikes;
    // private List<Comments> comments;

    constructor(comments?: Comment[], description?: string, dislikes?: Account[],
                id?: number, likes?: Account[], mediaUrl?: string, title?: string) {

        this.comments = comments;
        this.description =  description;
        this.dislikes = dislikes;
        this.id = id;
        this.likes =  likes;
        this.mediaUrl = mediaUrl;
        this.title = title;
    }

    getFilter(): string{
        return this.description;
    }

}
