import { Instance } from "app/Interfaces/Instance";

export class Post implements Instance{
    id: number;
    media: string;
    description: string;
    likes: number;
    dislikes: number;

    constructor(ident: number, desc: string, like: number, disl: number, medi?: string) {
        this.id = ident;
        this.media = (medi) ? medi: '';
        this.description = desc;
        this.likes = like;
        this.dislikes = disl;
    }

    getFilter(): string{
        return this.description;
    }

}
