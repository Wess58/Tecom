import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

import content from "../../jsons/content.json";

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
  activateFade = false;
  offers = content.offers;
  currentOffer: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    window.scroll(0, 0);

    this.activateFade = true;

    this.currentOffer = this.offers[+this.activatedRoute.snapshot.params['index'] - 1];

    this.currentBackground = this.currentOffer.images[0];
    window.setInterval(this.setBackground.bind(this), 10000);
  }

  setBackground(): any {

    this.currentImageIndex++;
    this.currentImageIndex = this.currentImageIndex % this.currentOffer.images ?.length;

    this.currentBackground = null;
    setTimeout(() => {
      this.currentBackground = this.currentOffer.images[this.currentImageIndex];
    }, 10);

  }

}
