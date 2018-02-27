import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  LogOut() {
    this.auth.logout();
  }

  ngOnInit() {
  }

}
