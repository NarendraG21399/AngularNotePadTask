import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Notepad } from 'src/app/model/notepad.model';

@Component({
  selector: 'app-password-popup',
  templateUrl: './password-popup.component.html',
  styleUrls: ['./password-popup.component.scss'],
})
export class PasswordPopupComponent implements OnInit {
  @Input() public notepad: Notepad;
  @Output() private onclosed = new EventEmitter();
  @Input() public fromCreateNote: boolean;
  public FormGroup: FormGroup;
  public isPasswordRight = true;
  public isSubmit = false;
  constructor() {}

  ngOnInit(): void {
    this.FormGroup = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  get f() {
    return this.FormGroup.controls.password;
  }
  public onSubmit(): void {
    this.isSubmit = true;
    if (this.fromCreateNote && this.FormGroup.valid) {
      this.close(this.FormGroup.value.password);
    } else if (
      !this.fromCreateNote &&
      this.FormGroup.value.password === this.notepad.password &&
      this.FormGroup.valid
    ) {
      this.close(true);
    }
    this.isPasswordRight = false;
  }

  public close(validate): void {
    this.onclosed.emit(validate);
  }
}
