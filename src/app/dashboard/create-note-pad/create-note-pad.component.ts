import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Notepad } from 'src/app/model/notepad.model';
import { ActivatedRoute } from '@angular/router';
import { NotepadService } from 'src/app/service/notepad.service';
import { CONSTANT } from 'src/app/constant/app.constant';

@Component({
  selector: 'app-create-note-pad',
  templateUrl: './create-note-pad.component.html',
  styleUrls: ['./create-note-pad.component.scss']
})
export class CreateNotePadComponent implements OnInit, AfterViewInit {
  @ViewChild('autofocus') focus: ElementRef;
  private id: number;
  public notepad: Notepad = { isLock: false, password: null };
  public text: string;
  public password: boolean;
  public isSaveNotepad: boolean;
  public message: string;
  public toaster: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notepadservice: NotepadService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params.id;
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.notepad = this.notepadservice.getNotepad(this.id);
    }
  }
  ngAfterViewInit(): void {
    this.focus.nativeElement.focus();
  }
  public saveNotepad(): void {
    if (this.id || this.notepad.id) {
      this.updateNoted();
    } else {
      this.isSaveNotepad = true;
    }
  }
  public createNotePad(event) {
    this.isSaveNotepad = false;
    if (event) {
      this.notepad = new Notepad(
        this.notepad.text,
        event,
        this.notepad.isLock,
        this.notepad.password
      );
      this.notepadservice.setList(this.notepad);
      this.showtoaster(CONSTANT.FILE_SAVE__MESSAGE);
    }
  }

  private updateNoted() {
    this.notepadservice.updateNotepad(this.id , this.notepad.text, this.notepad.isLock);
    this.showtoaster(CONSTANT.FILE_UPDATE__MESSAGE);
  }
  public lockNotepad(): void {
    if (!this.notepad.title){
      this.showtoaster(CONSTANT.FILE_SAVE);
      return;
    }
    this.password = true;
  }
  public savePassword(event): void {
    this.password = false;
    if (event) {
      this.notepad.isLock = !this.notepad.isLock;
      this.notepad.password = event;
      this.showtoaster(CONSTANT.FILE_LOCK_MESSAGE);
    }
  }

  private showtoaster(message): void {
    this.toaster = true;
    this.message = message;
    setTimeout(() => {
      this.toaster = false;
    }, 3000);
  }

  public unLock(): void {
    if (confirm(CONSTANT.CONFIRM_MESSAGE)) {
      this.notepad.isLock = !this.notepad.isLock;
      this.showtoaster(CONSTANT.FILE_UNLOCK_MESSAGE);
    }
  }

}
