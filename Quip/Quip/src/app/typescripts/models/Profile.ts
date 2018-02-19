import { Account } from './Account';
import { Post } from './Post';

export class Profile {
    account: Account;
    posts: Post[];
    friends: Account[];
    recommendedFriends: Account[];
}