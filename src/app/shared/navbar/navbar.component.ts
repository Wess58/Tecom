import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  morphNavbar = false;
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

  constructor() { }

  ngOnInit(): void {
  }

}
