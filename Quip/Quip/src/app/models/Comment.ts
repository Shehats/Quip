import { Instance } from "app/Interfaces/Instance";
import { Account } from './Account';
import { Profile } from './Profile';
export class Comment implements Instance{
    id: number;
<<<<<<< HEAD
    owner: Account;
    parentId: Profile;
=======
    owner: number;
    parentId: number;
>>>>>>> 158d543bd248d8591be018f1963c1e5e3ac03511
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

<<<<<<< HEAD
=======
    constructor(identifier: number, owner:number, parent: number, desc: string, like: number, disl: number) {
        this.id = identifier;
        this.owner = owner;
        this.description = desc;
        this.parentId = parent;
        this.likes = like;
        this.dislikes = disl;

>>>>>>> 158d543bd248d8591be018f1963c1e5e3ac03511
    }

    getFilter(): string {
        return this.description;
    }

}