import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NotepadService } from '../service/notepad.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private notepadService: NotepadService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      this.notepadService.isAuthenticate ||
      !this.notepadService.getNotepad(+route.params.id).isLock
    ) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
