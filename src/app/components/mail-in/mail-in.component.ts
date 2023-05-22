import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { INotificationDTO, NotificationDTO } from '../../services/notification-data.model';
import { NotificationService } from "../../services/notification.service";
import disclaimer from "../../jsons/disclaimer.json";
import content from "../../jsons/content.json";

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

  emailForm: any = {
    fullName: '',
    email: '',
    phone: '',
    message: '',
    location: '',
    service: ''
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
  services = content.offers;
  acceptDisclaimer = false;
  requestType = '';
  subject = '';
  selectedServiceIndex: any;

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.requestType = this.activatedRoute.snapshot.queryParams.type;
        this.setSubject();
        // console.log(this.activatedRoute.snapshot.queryParams.type);


        this.emailForm.service = +this.activatedRoute.snapshot.queryParams.index ?? '';

      }
    });
  }

  ngOnInit(): void {

  }

  setSubject(): void {
    if (this.requestType === 'services') {
      this.subject = 'Tecom Advance Service Inquiry '

    } else {
      this.subject = 'Tecom Advance Mail-in Request '
    }

  }


  formValidation(): void {
    if ((/\S+@\S+\.\S+/).test(this.emailForm.email)) {
      this.emailInvalid = false;
      this.sending = true;
      this.emailForm.email = this.emailForm.email.toLowerCase();

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
    if ((/\S+@\S+\.\S+/).test(this.ccEmail)) {
      this.ccEmailInvalid = false;

      if (this.ccEmails.indexOf(this.ccEmail) === -1 && this.ccEmail.toLowerCase() !== this.emailForm.email.toLowerCase()) {
        this.emailExists = false;
        this.ccEmails.push(this.ccEmail.toLowerCase());
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
    this.router.navigate(['/']);

    this.emailForm = {
      fullName: '',
      email: '',
      phone: '',
      message: '',
      location: '',
      service: ''
    };
    this.emailInvalid = false;
    this.hasError = false;
    this.sending = false;
    this.ccEmail = '';
    this.ccEmails = [];
    this.ccEmailInvalid = false;
    this.emailExists = false;
    this.acceptDisclaimer = false;

    setTimeout(() => {
      this.stage = 1;
    }, 1000);
  }

  generateRefId(): void {
    this.refId = '#TA-' + '' + new Date().getFullYear() + '' + (new Date().getMonth() + 1) + '' + new Date().getDate() + '' + new Date().getHours() + '' + new Date().getMinutes();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
    result.subscribe(
      (res: any) => this.onSaveSuccess(res),
      (error: any) => this.onSaveError(error));
  }

  protected onSaveSuccess(res: any) {
    // console.log(res);

    this.hasError = false;
    this.stage = 2;
    this.sending = false;
  }

  protected onSaveError(error: any) {
    // console.log(error);
    this.hasError = true;
    this.sending = false;
  }

  private getUserNotificationDTO(): any {

    return {
      ...new NotificationDTO(),
      receiverEmail: this.emailForm.email,
      cc: this.ccEmails.toString() ?? null,
      subject: this.subject + this.refId,
      body: this.requestType === 'services' ? this.createUserMessageForServices() : this.createUserMessage(),
      html: true,
      isMultiPart: false

    };
  }

  private getBusinessNotificationDTO(): any {
    return {
      ...new NotificationDTO(),
      receiverEmail: 'tecomadvance@gmail.com',
      subject: this.subject + this.refId,
      body: this.requestType === 'services' ? this.createBusinessMessageForServices() : this.createBusinessMessage(),
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
  private createUserMessageForServices(): string {

    return '<!DOCTYPE html>\n' +
      '<html lang="en">\n' +
      '<head>\n' +
      '    <title> Tecom Advance Service Inquiry ' + this.refId + '</title>\n' +
      '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n' +
      '</head>' +
      '<body>\n' +
      '    <p>Hello ' + this.emailForm.fullName.split(' ')[0] + ', </p>\n' +
      '    <p>We\'ve received your service inquiry details for ' + this.services[this.emailForm.service - 1].title + ' with reference number <strong>' + this.refId + '</strong> </p>\n' +
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
      '    <p>Client Location: ' + this.emailForm.location + '</p>\n' +
      '    <p>Problem description: ' + this.emailForm.message + '</p>\n' +
      '</body>' +
      '</html>';
  }

  private createBusinessMessageForServices(): string {
    return '<!DOCTYPE html>\n' +
      '<html lang="en">\n' +
      '<head>\n' +
      '    <title> Tecom Advance Service Inquiry ' + this.refId + '</title>\n' +
      '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n' +
      '</head>' +
      '<body>\n' +
      '    <p>New mail-in request from website form,</p>\n' +
      '    <p>Client name: ' + this.emailForm.fullName + '</p>\n' +
      '    <p>Client Phone number: ' + this.emailForm.phone + '</p>\n' +
      '    <p>Client Email Address: ' + this.emailForm.email + '</p>\n' +
      '    <p>Service inquired: ' + this.services[this.emailForm.service - 1].title + '</p>\n' +
      '    <p>Problem description: ' + this.emailForm.message + '</p>\n' +
      '</body>' +
      '</html>';
  }

}
