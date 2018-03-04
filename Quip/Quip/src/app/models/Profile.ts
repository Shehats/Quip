import { Account } from './Account';
import { Post } from './Post';
import { Instance } from 'app/Interfaces/Instance';

export class Profile implements Instance {
    account: Account;
    posts: Post[];
    friends: Account[];
    recommendedFriends: Account[];
    description: string;

    constructor(acc?: Account, posted?: Post[], friendly?: Account[], recomm?: Account[], desc?: string) {
        this.account = acc;
        this.posts = posted;
        this.friends = friendly;
        this.recommendedFriends = recomm;
        this.description = desc;
    }

    getFilter(): string {
        return (this.account)?this.account.getFilter():'';
    }

}