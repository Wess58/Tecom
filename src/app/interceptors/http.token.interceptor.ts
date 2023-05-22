import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class HttpTokenInterceptor implements HttpInterceptor {
  token = "dGVjb21hZHZhbmNlQGdtYWlsLmNvbTpzdXJ3YW9obnNwdXJoZHRj";

  constructor(
    private router: Router
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      // 'Content-Type': 'multipart/form-data',

    };

    // const token = this.localStorageService.retrieve('token');

    const request = req.clone({
      setHeaders: {
        'apikey': `${this.token}`
      }
    });

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401 || err.status === 403) {
        console.log(err);

      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }

}
