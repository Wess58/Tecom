import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseURL = environment.API_ENDPOINT;

  constructor(
    private http: HttpClient

  ) { }


  emailWithoutAttachments(notificationDTO: any): Observable<any> {
    return this.http.post<any>(this.baseURL , notificationDTO, { observe: 'response' });
  }

  // emailWithAttachments(file: File, title: string, description: string): Observable<any> {
  //
  //   const formData: FormData = new FormData();
  //   formData.append('video', file);
  //   formData.append('title', title);
  //   formData.append('description', description);
  //
  //   // console.log(formData);
  //
  //   const req = new HttpRequest('POST', this.baseURL + 'video/upload', formData, {
  //     reportProgress: true
  //   });
  //
  //   return this.http.request(req);
  // }
}
