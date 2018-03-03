import { Instance } from "app/Interfaces/Instance";

export class Account implements Instance {
    id: number;
    username: string;
    fname: string;
    lname: string;
    profilePic: string;
    email: string;

    constructor(id?: number, username?: string, fname?: string, lname?: string, profilePic?: string, email?: string) {
        this.id = id;
        this.username = username;
        this.fname = fname;
        this.lname = lname;
        this.profilePic = profilePic;
        this.email = email;
    }

    getFilter(): string{
        return this.username + " " + this.fname + " " + this.lname;
    }

}
