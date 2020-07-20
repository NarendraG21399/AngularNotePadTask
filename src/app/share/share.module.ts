import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ToasterComponent } from './component/toaster/toaster.component';
import { NotepadSaveComponent } from './component/notepad-save/notepad-save.component';
import { PasswordPopupComponent } from './component/password-popup/password-popup.component';



@NgModule({
  declarations: [ToasterComponent, NotepadSaveComponent, PasswordPopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports : [ToasterComponent, NotepadSaveComponent, PasswordPopupComponent, FormsModule],
  entryComponents:[PasswordPopupComponent]
})
export class ShareModule { }
