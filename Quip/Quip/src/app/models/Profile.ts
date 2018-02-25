import { Account } from './Account';
import { Post } from './Post';
import { Instance } from 'app/Interfaces/Instance';

export class Profile implements Instance{
    account: Account;
    posts: Post[];
    friends: Account[];
    recommendedFriends: Account[];

    constructor(acc: Account, posted: Post[], friendly: Account[], recomm: Account[]){
        this.account = acc;
        this.posts = posted;
        this.friends = friendly;
        this.recommendedFriends = recomm;
    }
    
    getFilter(): string{
        return this.account.getFilter();
    }

}