import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute, ActivationEnd, ActivationStart } from '@angular/router';

import content from "../../jsons/content.json";
declare const bootstrap: any;

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        // :enter is alias to 'void => *'
        style({ opacity: 0.5 }),
        animate(600, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ServiceDetailComponent implements OnInit {

  currentBackground: any;
  currentImageIndex = 0;
  currentCarouselImageIndex = 0;
  activateFade = false;
  offers = content.offers;
  currentOffer: any;
  animateAfterViewInit = false;



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    router.events.subscribe((val) => {

      if (val instanceof ActivationEnd) {
        // console.log(val);
        this.animateAfterViewInit = false;

        this.ngOnInit();
        this.callAnimationTimeout();
        // console.log(this.activatedRoute.snapshot.params);

      }

    });
  }

  ngOnInit(): void {

    window.scrollTo({ top: 1, behavior: "smooth" });
    this.currentOffer = this.offers[+this.activatedRoute.snapshot.params['index'] - 1];

    // this.activateFade = true;
    // this.currentBackground = this.currentOffer.images[0];
    // window.setInterval(this.setBackground.bind(this), 10000);
  }

  ngAfterViewInit(): void {
    new bootstrap.Carousel(document.querySelector('#carouselSlides'), {
      interval: 7000
    });
  }

  callAnimationTimeout(): void {
    setTimeout(() => {
      this.animateAfterViewInit = true;
    }, 200);
  }


  setBackground(): any {

    this.currentImageIndex++;
    this.currentImageIndex = this.currentImageIndex % this.currentOffer.images?.length;

    this.currentBackground = null;
    setTimeout(() => {
      this.currentBackground = this.currentOffer.images[this.currentImageIndex];
    }, 10);

  }

}
