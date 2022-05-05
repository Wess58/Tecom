import { Component, OnInit, HostListener } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import content from "../jsons/content.json";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any) {
    // console.log($event);
    // console.log("scrolling", window.pageYOffset);
    if (window.innerWidth > 770) {
      if ((window.pageYOffset / window.innerHeight * 100) > 90) {
        this.showArrow = true;
      } else {
        this.showArrow = false;
      }
    } else {
      if ((window.pageYOffset / window.innerHeight * 100) > 60) {
        this.showArrow = true;
      } else {
        this.showArrow = false;
      }
    }


  }

  showArrow = false;

  workImages = content.workImages;
  brandImages = content.brandImages;
  offers = content.offers;


  constructor() { }

  ngOnInit(): void {
    window.scroll(0, 0);

  }

  topFunction(): void {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

  }


}
