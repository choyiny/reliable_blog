import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public name: string;
  public loggedIn: boolean;
  token: string;

  constructor() {
    this.loggedIn = false;
  }

  login(email: string, password: string): Observable<boolean> {
    this.loggedIn = true;
    this.name = 'Jordan Liu';
    return of(true);
  }

  logout() {
    this.loggedIn = false;
  }
}
