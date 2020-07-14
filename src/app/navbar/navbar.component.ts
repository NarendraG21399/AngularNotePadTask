import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  public myFunction(): void {
    const x = document.getElementById('navDemo');
    if (x.className.indexOf(' w3-show') === -1) {
      x.className += ' w3-show';
    } else {
      x.className = x.className.replace(' w3-show', '');
    }
  }
}
