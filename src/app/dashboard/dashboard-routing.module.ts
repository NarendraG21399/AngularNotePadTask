import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNotePadComponent } from './create-note-pad/create-note-pad.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
     component: HomeComponent,
  },
  {
    path: 'creteNotepad',
    component: CreateNotePadComponent
  },
  {
    path: 'editNotepad/:id',
    component: CreateNotePadComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  CreateNotePadRoutingModule{ }
