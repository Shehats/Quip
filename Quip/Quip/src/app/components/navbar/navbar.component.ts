import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { ActionsService } from '../../services/http/actions.service';
import { Observable } from 'rxjs/Observable';
import { Account } from 'app/models/Account';
import { Backend } from '../../Interfaces/Backend';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private backend: Backend = new Backend();

  @Output('stateMode') outgoingData = new EventEmitter<boolean>();

  constructor(private auth: AuthService, private actions: ActionsService) { }

  accounts$: Observable<Account[]> = null;
  searchArg: string;

  LogOut() {
    this.auth.logout();
  }

  ngOnInit() {
    this.accounts$ = this.actions.fetchAll<Account>(this.backend.baseUrl);
  }

  public sendState(data: any) {
    this.outgoingData.emit(data);
  }
}



