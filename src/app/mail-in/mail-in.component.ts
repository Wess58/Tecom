import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { INotificationDTO, NotificationDTO } from '../services/notification-data.model';
import { NotificationService } from "../services/notification.service";

@Component({
  selector: 'app-mail-in',
  templateUrl: './mail-in.component.html',
  styleUrls: ['./mail-in.component.scss']
})
export class MailInComponent implements OnInit {

  emailForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  };

  emailInvalid = false;
  hasError = false;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }


  formValidation(): void {
    if (/\S+@\S+\.\S+/.test(this.emailForm.email)) {
      this.emailInvalid = false;

      const userNotificationDTO = this.getUserNotificationDTO();
      this.subscribeToSaveResponse(this.notificationService.emailWithoutAttachments(userNotificationDTO));

      const businessNotificationDTO = this.getBusinessNotificationDTO();
      this.subscribeToSaveResponse(this.notificationService.emailWithoutAttachments(businessNotificationDTO));

    } else {
      this.emailInvalid = true;
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {

    this.hasError = false;

    this.emailForm = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      message: ''
    };;

    setTimeout(() => {
      document.getElementById("closeBtn")!.click();
    }, 2500);

  }

  protected onSaveError() {
    this.hasError = true;
  }

  private getUserNotificationDTO(): any {
    return {
      ...new NotificationDTO(),
      receiverEmail: this.emailForm.email,
      subject: 'Tecom Advance Mail-in Request',
      body: this.createUserMessage(),
      isHtml: true,
      isMultiPart: false

    };
  }

  private getBusinessNotificationDTO(): any {
    return {
      ...new NotificationDTO(),
      receiverEmail: 'tecomadvance@gmail.com',
      subject: 'Tecom Advance Mail-in Request',
      body: this.createBusinessMessage(),
      isHtml: true,
      isMultiPart: false

    };
  }



  private createUserMessage(): string {
    return '<!DOCTYPE html>\n' +
      '<html lang="en">\n' +
      '<head>\n' +
      '    <title>' + 'Tecom Advance Mail-in Request</title>\n' +
      '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n' +
      '</head>' +
      '<body>\n' +
      '    <p>Dear Sales Team,</p>\n' +
      '    <p>Name: ' + this.emailForm.firstName + ' ' + this.emailForm.lastName + '</p>\n' +
      '    <p>Email Address: ' + this.emailForm.email + '</p>\n' +
      '    <p>Comments: ' + this.emailForm.message + '</p>\n' +
      '    <p>\n' +
      '        <span>Regards,</sgetpan>\n' +
      '        <br />\n' +
      '        <em>Sales Team.</em>\n' +
      '    </p>\n' +
      '</body>' +
      '</html>';
  }

  private createBusinessMessage(): string {
    return '<!DOCTYPE html>\n' +
      '<html lang="en">\n' +
      '<head>\n' +
      '    <title>' + 'Tecom Advance Mail-in Request</title>\n' +
      '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n' +
      '</head>' +
      '<body>\n' +
      '    <p>Dear Sales Team,</p>\n' +
      '    <p>Name: ' + this.emailForm.firstName + ' ' + this.emailForm.lastName + '</p>\n' +
      '    <p>Email Address: ' + this.emailForm.email + '</p>\n' +
      '    <p>Comments: ' + this.emailForm.message + '</p>\n' +
      '    <p>\n' +
      '        <span>Regards,</sgetpan>\n' +
      '        <br />\n' +
      '        <em>Sales Team.</em>\n' +
      '    </p>\n' +
      '</body>' +
      '</html>';
  }

}
