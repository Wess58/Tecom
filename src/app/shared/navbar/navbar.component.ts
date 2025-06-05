import { Component, OnInit, HostListener } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import content from "../../jsons/content.json";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(400, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {

  morphNavbar = false;
  changeIcon = false;
  offers = content.offers;
  serviceIndex = 0;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    // console.log($event);
    // console.log("scrolling", window.pageYOffset);


    if (window.innerWidth > 770) {
      if ((window.pageYOffset / window.innerHeight * 100) > 70) {
        this.morphNavbar = true;
      } else {
        this.morphNavbar = false;
      }
    } else {
      if ((window.pageYOffset / window.innerHeight * 100) > 60) {
        this.morphNavbar = true;
      } else {
        this.morphNavbar = false;
      }
    }

  }

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      const urlSplit: any = this.router.url.split('/');
      this.serviceIndex = urlSplit[urlSplit.length - 1];
    }, 10);

    setTimeout(() => {
      this.activatedRoute.queryParams.subscribe((params: any) => {
        if (params['type'] === 'mail-in') {
          const close: HTMLElement = document.getElementById('mailInModalBtn') as HTMLElement;
          close?.click();
        }
      });
    }, 10);

  }

  toggleIcon(): void {
    this.changeIcon = !this.changeIcon;
  }

  // refresh(): void {
  //   setTimeout(() => {
  //     location.reload();
  //   }, 1);
  // }


}
