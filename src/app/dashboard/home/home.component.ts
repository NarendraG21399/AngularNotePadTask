import { Component, OnInit } from '@angular/core';
import { Notepad } from '../../model/notepad.model';
import { NotepadService } from 'src/app/service/notepad.service';
import { Router } from '@angular/router';
import { CONSTANT, ROUTINGPATH } from 'src/app/constant/app.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public notepadList: Notepad[];
  public showModel = false;
  public selectedList: Notepad;
  constructor(private notepadservice: NotepadService, private router: Router) { }

  ngOnInit(): void {
    this.getNotepadList();
  }

  private getNotepadList(): void{
    this.notepadList = this.notepadservice.getList();
  }
  public navigate(notepad: Notepad): void {
    if (notepad.isLock) {
      this.showModel = true;
      this.selectedList = notepad;
      return;
    }
    this.notepadservice.isAuthenticate = true;
    this.router.navigate([ROUTINGPATH.EDIT_NOTEPAD, notepad.id]);
  }
  public validate(data?): void {
    if (data) {
      this.notepadservice.isAuthenticate = true;
      this.router.navigate([ROUTINGPATH.EDIT_NOTEPAD, this.selectedList.id]);
    }
    this.showModel = false;
  }
  public delete(notepad: Notepad): void {
    if (confirm(CONSTANT.CONFIRM_MESSAGE)) {
      this.notepadservice.delete(notepad.id);
      this.getNotepadList();
    }
  }
  public trackByNoteId(index: number, notepad: Notepad): number {
    return notepad.id;
}
}
