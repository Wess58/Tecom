import { Component, OnInit, HostListener } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import content from "../../jsons/content.json";

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
      if (window.pageYOffset > 560) {
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

  constructor() { }

  ngOnInit(): void {
    window.scrollTo({ top: 1, behavior: "smooth" });

  }

  topFunction(): void {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

  }


}
