import { Instance } from "app/Interfaces/Instance";

export class Account implements Instance {
    id: number;
    username: string;
    fname: string;
    lname: string;
    profilePic: any;
    email: string;

    constructor(identifier: number, username: string, first: string, last: string, profile: any, mail: string) {
        this.id = identifier;
        this.username = username;
        this.fname = first;
        this.lname = last;
        this.profilePic = profile;
        this.email = mail;
    }

    getFilter(): string{
        return this.username + " " + this.fname + " " + this.lname;
    }

}
