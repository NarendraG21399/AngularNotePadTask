import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-notepad-save',
  templateUrl: './notepad-save.component.html',
  styleUrls: ['./notepad-save.component.scss'],
})
export class NotepadSaveComponent implements OnInit {
  public FormGroup: FormGroup;
  public isSubmit: boolean;
  @Output() private saveNotePad = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.FormGroup = new FormGroup({
      Name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }
  get f() {
    return this.FormGroup.controls.Name;
  }
  public onSubmit(): void {
    this.isSubmit = true;
    if (this.FormGroup.valid) {
      this.saveNotePad.emit(this.FormGroup.value.Name);
    }
  }
  public close(): void {
    this.saveNotePad.emit();
  }
}
