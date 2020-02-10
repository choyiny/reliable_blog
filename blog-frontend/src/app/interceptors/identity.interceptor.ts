// Angular
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CurrentUserService} from '@root/services/current-user.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class IdentityInterceptor implements HttpInterceptor {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if logged-in
    if (!!this.currentUserService.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.currentUserService.token}`,
        }
      });
    } else {
      this.currentUserService.token = null;
    }

    // pass on request
    return next.handle(request).pipe(
      catchError(
        (err) => {
          if (err.status === 401) {
            this.handleAuthError();
            return of(err);
          }
          throw err;
        }
      )
    );
  }

  private handleAuthError() {
    this.currentUserService.logout();
    this.router.navigate(['/login']);
  }
}
