import { Account } from './Account';
import { Post } from './Post';
import { Instance } from 'app/Interfaces/Instance';

export class Profile implements Instance {
    profileId: number;
    account: Account;
    posts: Post[];
    friends: Account[];
    recommendedFriends: Account[];
    description: string;

    constructor(profileId?: number, acc?: Account, posted?: Post[], friendly?: Account[], recomm?: Account[], desc?: string) {
        this.profileId = profileId;
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