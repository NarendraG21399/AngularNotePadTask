import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Notepad } from '../model/notepad.model';

@Injectable({
  providedIn: 'root',
})
export class NotepadService {
  private notepadList: Notepad[];
  public isAuthenticate: boolean;
  constructor() {
    this.notepadList = JSON.parse(localStorage.getItem('notepadlist')) || [];
  }
  public getList(): Notepad[] {
    return this.notepadList;
  }

  public setList(data: Notepad): void {
    this.notepadList.push(data);
    this.setLocalstrorage();
  }

  public setLocalstrorage(): void {
    localStorage.setItem('notepadlist', JSON.stringify(this.notepadList));
  }
  public delete(id: number) {
    const notepadlist = this.notepadList.filter((ele) => ele.id !== id);
    this.notepadList = notepadlist;
    this.setLocalstrorage();
  }
  public getNotepad(id: number): Notepad {
    return this.getList().find((data) => data.id === id);
  }

  public exportTotextFile(data: Notepad ){
    const blob = new Blob([ data.text]);
    saveAs(blob,  data.title);
  }
}
