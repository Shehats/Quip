import { Instance } from "app/Interfaces/Instance";

export class Comment implements Instance{
    id: number;
    parentId: number;
    description: string;
    likes: number;
    dislikes: number;

    constructor(identifier: number, parent: number, desc: string, like: number, disl: number) {
        this.id = identifier;
        this.parentId = parent;
        this.description = desc;
        this.likes = like;
        this.dislikes = disl;
    }

    getFilter(): string {
        return this.description;
    }

}
