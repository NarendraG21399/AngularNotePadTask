export class Notepad {
    id?: number;
    text?: string;
    title?: string;
    modified?: Date;
    create?: Date;
    isLock: boolean;
    password: string;
    constructor(text: string, Title: string, isLock: boolean, password: string ){
        this.id = new Date().getTime();
        this.create = new Date();
        this.modified = new Date();
        this.text = text;
        this.title = Title;
        this.isLock = isLock;
        this.password = password;
    }
}
