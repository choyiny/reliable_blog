import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {ApiEndpointService} from '@root/services/api-endpoint.service';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private _token: string;

  constructor(
    private endpointService: ApiEndpointService,
    private http: HttpClient
  ) {
    this._token = this.token;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(this.endpointService.urlFor('auth'), {email, password}).pipe(
      tap((result: {auth_token: string}) => {
        this.token = result.auth_token;
      }),
      map((result: {auth_token?: string, error?: string}) => {
        return !!result.auth_token;
      })
    );
  }

  public set token(token: string) {
    this.token = token;
    localStorage.setItem('t', token);
  }

  public get token(): string {
    return localStorage.getItem('t');
  }

  logout() {
    this.token = '';
  }
}
