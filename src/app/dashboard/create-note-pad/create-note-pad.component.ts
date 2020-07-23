import { Component, OnInit, ViewChild, ElementRef, AfterViewInit,   ViewContainerRef  } from '@angular/core';
import { Notepad } from 'src/app/model/notepad.model';
import { NotepadService } from 'src/app/service/notepad.service';
import { CONSTANT } from 'src/app/constant/app.constant';
@Component({
  selector: 'app-create-note-pad',
  templateUrl: './create-note-pad.component.html',
  styleUrls: ['./create-note-pad.component.scss']
})
export class CreateNotePadComponent implements OnInit, AfterViewInit {
  @ViewChild('autofocus') focus: ElementRef;
  public notepad: Notepad = { isLock: false, password: null };
  public password: boolean;
  public isSaveNotepad: boolean;
  public toaster: boolean;
  public message: string;
  public viewContainerRef: ViewContainerRef;
  constructor(
    private notepadservice: NotepadService
  ) {
  }

  ngOnInit(): void {
    if ( this.notepad.id ) {
      this.notepad = this.notepadservice.getNotepad(this.notepad.id);
    }
  }
  ngAfterViewInit(): void {
    this.focus.nativeElement.focus();
  }
  public saveNotepad(): void {
    this.notepad.id ?  this.updateNoted() : this.isSaveNotepad = true;
  }
  public createNotePad(event) {
    this.isSaveNotepad = false;
    if (event) {
      this.notepad.title = event;
      this.notepad = new Notepad(this.notepad);
      this.notepadservice.setList(this.notepad);
      this.showtoaster(CONSTANT.FILE_SAVE__MESSAGE);
    }
  }

  private updateNoted() {
    this.notepadservice.setLocalstrorage();
    this.showtoaster(CONSTANT.FILE_UPDATE__MESSAGE);
  }
  public lockNotepad(): void {
    this.notepad.id ? this.password = true : this.showtoaster(CONSTANT.FILE_SAVE);
  }
  public savePassword(event: string): void {
    this.password = false;
    if (event) {
      this.notepadservice.setLocalstrorage();
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
      this.notepad.isLock = false;
      this.notepad.password = null;
      this.notepadservice.setLocalstrorage();
      this.showtoaster(CONSTANT.FILE_UNLOCK_MESSAGE);
    }
  }
  public onChange(fileList: FileList): void {
    const file = fileList[0];
    const fileReader: FileReader = new FileReader();
    fileReader.onloadend = (x) => {
      this.notepad.text = fileReader.result as string;
    };
    fileReader.readAsText(file);
  }
  public closeModal(): void{
    this.viewContainerRef.clear();
  }
}
