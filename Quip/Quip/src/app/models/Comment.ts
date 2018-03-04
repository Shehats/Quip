import { Instance } from "app/Interfaces/Instance";

export class Comment implements Instance{
    id: number;
    owner: number;
    parentId: number;
    description: string;
    likes: number;
    dislikes: number;

    constructor(identifier: number, owner:number, parent: number, desc: string, like: number, disl: number) {
        this.id = identifier;
        this.owner = owner;
        this.description = desc;
        this.parentId = parent;
        this.likes = like;
        this.dislikes = disl;

    }

    getFilter(): string {
        return this.description;
    }

}
