import {
  Component,
  OnInit,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { Notepad } from '../../model/notepad.model';
import { NotepadService } from 'src/app/service/notepad.service';
import { Router } from '@angular/router';
import { CONSTANT } from 'src/app/constant/app.constant';
import { CreateNotePadComponent } from '../create-note-pad/create-note-pad.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public notepadList: Notepad[];
  public showModel = false;
  public selectedList: Notepad;
  public password: boolean;
  constructor(
    private notepadservice: NotepadService,
    private router: Router,
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.getNotepadList();
  }

  private getNotepadList(): void {
    this.notepadList = this.notepadservice.getList();
  }
  public navigate(notepad: Notepad): void {
    if (notepad.isLock) {
      this.showModel = true;
      this.selectedList = notepad;
      return;
    }
  }
  public validate(data?): void {
    if (data) {
      this.notepadservice.isAuthenticate = true;
      this.createNotepad(this.selectedList);
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
  public lock(note: Notepad): void {
    this.selectedList = note;
    this.password = true;
  }
  public savePassword(note) {
    this.password = false;
    if (note) {
      this.notepadservice.setLocalstrorage();
    }
  }
  public unlock(note: Notepad): void {
    if (confirm(CONSTANT.CONFIRM_MESSAGE)) {
      note.isLock = false;
      note.password = null;
      this.notepadservice.setLocalstrorage();
    }
  }
  public edit(note: Notepad) {
    if (note.isLock) {
      this.showModel = true;
      this.selectedList = note;
      return;
    }
    this.createNotepad(note);
  }
  public createNotepad(notepad?: Notepad) {
    this.viewContainerRef.clear();
    const cFactory = this.componentFactoryResolver.resolveComponentFactory(
      CreateNotePadComponent
    );
    const componentRef = this.viewContainerRef.createComponent(cFactory);
    notepad ? (componentRef.instance.notepad = notepad) : null;
    componentRef.instance.viewContainerRef = this.viewContainerRef;
  }
  public export(note: Notepad): void {
    this.notepadservice.exportTotextFile(note);
  }
}
