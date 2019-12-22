import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {ApiEndpointService} from '@root/services/api-endpoint.service';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  public token: string;

  constructor(
    private endpointService: ApiEndpointService,
    private http: HttpClient
  ) {
    this.token = this.getToken();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(this.endpointService.urlFor('auth'), {email, password}).pipe(
      tap((result: {auth_token: string}) => {
        this.setToken(result.auth_token);
      }),
      map((result: {auth_token?: string, error?: string}) => {
        return !!result.auth_token;
      })
    );
  }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem('t', token);
  }

  public getToken(): string {
    return localStorage.getItem('t');
  }

  logout() {
    this.token = '';
  }
}
