import { Instance } from "app/Interfaces/Instance";
import { Account } from './Account';
import { Profile } from './Profile';
export class Comment implements Instance{
    id: number;
    owner: Account;
    parentId: Profile;
    description: string;
    likes: Account[];
    dislikes: Account[];

    constructor(id: number, owner:Account, parentId: Profile, description: string, likes: Account[], dislikes: Account[]) {
        this.id = id;
        this.owner = owner;
        this.parentId = parentId;
        this.description = description;
        this.likes = likes;
        this.dislikes = dislikes;

    }

    getFilter(): string {
        return this.description;
    }

}
