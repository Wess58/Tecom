import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { style, animate, transition, trigger } from '@angular/animations';

import { INotificationDTO, NotificationDTO } from '../services/notification-data.model';
import { NotificationService } from "../services/notification.service";
import disclaimer from "../jsons/disclaimer.json";
@Component({
  selector: 'app-mail-in',
  templateUrl: './mail-in.component.html',
  styleUrls: ['./mail-in.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class MailInComponent implements OnInit {

  emailForm = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  };
  ccEmails: any = [];
  ccEmail = '';

  emailInvalid = false;
  hasError = false;
  stage = 1;
  refId: any;
  sending = false;
  ccEmailInvalid = false;
  emailExists = false;
  disclaimer = disclaimer.content;
  acceptDisclaimer = false;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // console.log(this.disclaimer);
  }

  formValidation(): void {
    if (/\S+@\S+\.\S+/.test(this.emailForm.email)) {
      this.emailInvalid = false;
      this.sending = true;

      this.generateRefId();


      const userNotificationDTO = this.getUserNotificationDTO();
      this.subscribeToSaveResponse(this.notificationService.emailWithoutAttachments(userNotificationDTO));

      const businessNotificationDTO = this.getBusinessNotificationDTO();
      this.subscribeToSaveResponse(this.notificationService.emailWithoutAttachments(businessNotificationDTO));

    } else {
      this.emailInvalid = true;
    }
  }

  validateCCEmail(): void {
    if (/\S+@\S+\.\S+/.test(this.ccEmail)) {
      this.ccEmailInvalid = false;

      if (this.ccEmails.indexOf(this.ccEmail) === -1 && this.ccEmail.toLowerCase() !== this.emailForm.email.toLowerCase()) {
        this.emailExists = false;
        this.ccEmails.push(this.ccEmail);
        this.ccEmail = '';

      } else {
        this.emailExists = true;
      }

    } else {
      this.ccEmailInvalid = true;
    }
  }

  removeEmail(email: string, index: any): void {
    this.ccEmails.splice(index, 1);
  }

  reset(): void {
    this.emailForm = {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      message: ''
    };
    this.emailInvalid = false;
    this.hasError = false;
    this.sending = false;
    this.ccEmail = '';
    this.ccEmails = [];
    this.ccEmailInvalid = false;
    this.emailExists = false;

    setTimeout(() => {
      this.stage = 1;
    }, 1000);
  }

  generateRefId(): void {
    // console.log('custom', 'TA-' , new Date().getFullYear() , new Date().getMonth() , new Date().getDate() , new Date().getHours(),new Date().getMinutes());

    this.refId = '#TA-' + '' + new Date().getFullYear() + '' + new Date().getMonth() + '' + new Date().getDate() + '' + new Date().getHours() + '' + new Date().getMinutes();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe(
      (res: any) => this.onSaveSuccess(res),
      (error: any) => this.onSaveError(error));
  }

  protected onSaveSuccess(res: any) {
    console.log(res);

    this.hasError = false;
    this.stage = 2;
    this.sending = false;
  }

  protected onSaveError(error: any) {
    console.log(error);
    this.hasError = true;
    this.sending = false;
  }

  private getUserNotificationDTO(): any {
    return {
      ...new NotificationDTO(),
      receiverEmail: this.emailForm.email,
      cc: this.ccEmails.toString(),
      subject: 'Tecom Advance Mail-in Request ' + this.refId,
      body: this.createUserMessage(),
      html: true,
      isMultiPart: false

    };
  }

  private getBusinessNotificationDTO(): any {
    return {
      ...new NotificationDTO(),
      receiverEmail: 'tecomadvance@gmail.com',
      subject: 'Tecom Advance Mail-in Request ' + this.refId,
      body: this.createBusinessMessage(),
      html: true,
      isMultiPart: false

    };
  }


  private createUserMessage(): string {
    return '<!DOCTYPE html>\n' +
      '<html lang="en">\n' +
      '<head>\n' +
      '    <title> Tecom Advance Mail-in Request ' + this.refId + '</title>\n' +
      '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n' +
      '</head>' +
      '<body>\n' +
      '    <p>Hello ' + this.emailForm.fullName.split(' ')[0] + ', </p>\n' +
      '    <p>We\'ve received your repair mail-in details with reference number <strong>' + this.refId + '</strong> </p>\n' +
      '    <p>Our technician will be in touch within the next 24 hours.</p>\n' +
      '   <br>\n' +
      '    <p>Please call or whatsapp our contact centre on +254 792 553 595 <strong>OR</strong> +254 720 402 275 in case you have any inquiries.</p>\n' +
      '    <p>Address : Kiambu Road - Pongezi Plaza on First Floor, <strong>Room FF11</strong> </p>\n' +
      '    <p>\n' +
      '        <span>Regards,</span>\n' +
      '        <br />\n' +
      '        <em>Tecom Advance.</em>\n' +
      '    </p>\n' +
      '</body>' +
      '</html>';
  }

  private createBusinessMessage(): string {
    return '<!DOCTYPE html>\n' +
      '<html lang="en">\n' +
      '<head>\n' +
      '    <title> Tecom Advance Mail-in Request ' + this.refId + '</title>\n' +
      '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n' +
      '</head>' +
      '<body>\n' +
      '    <p>New mail-in request from website form,</p>\n' +
      '    <p>Client name: ' + this.emailForm.fullName + '</p>\n' +
      '    <p>Client Phone number: ' + this.emailForm.phone + '</p>\n' +
      '    <p>Client Email Address: ' + this.emailForm.email + '</p>\n' +
      '    <p>Problem description: ' + this.emailForm.message + '</p>\n' +
      '</body>' +
      '</html>';
  }

}
