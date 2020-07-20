export class Notepad {
    id?: number;
    text?: string;
    title?: string;
    modified?: Date;
    create?: Date;
    isLock: boolean;
    password: string;
    constructor(notepad: Notepad){
        this.id = new Date().getTime();
        this.create = new Date();
        this.modified = new Date();
        this.text = notepad.text;
        this.title = notepad.title;
        this.isLock = notepad.isLock;
        this.password = notepad.password;
    }
}
