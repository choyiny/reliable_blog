import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public loggedIn: boolean;
  token: string;

  constructor() {
    this.loggedIn = false;
  }

  logout() {
    this.loggedIn = false;
  }
}
