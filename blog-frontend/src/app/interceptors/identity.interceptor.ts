// Angular
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CurrentUserService} from '@root/services/current-user.service';

@Injectable()
export class IdentityInterceptor implements HttpInterceptor {
  constructor(private currentUserService: CurrentUserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if logged-in
    if (!!this.currentUserService.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.currentUserService.token}`,
        }
      });
    } else {
      this.currentUserService.setToken(null);
    }

    // pass on request
    return next.handle(request);
  }
}
