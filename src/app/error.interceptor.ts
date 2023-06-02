import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { AppStateService } from './app-state.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly appStateService = inject(AppStateService);
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        const error = err.error.message || err.statusText;
        this.appStateService.setError(error);
        return throwError(error);
      })
    );
  }
}
