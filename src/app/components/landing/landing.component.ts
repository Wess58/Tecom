import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger, query, stagger } from '@angular/animations';
import content from "../../jsons/content.json";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(3000, style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInGrow', [
      transition(':enter', [   // :enter is alias to 'void => *'
      style({ opacity: 0, marginTop: 40 }),
        animate('500ms ease', style({ opacity: 1, marginTop: 0 }))
      ])
    ])
  ]
})
export class LandingComponent implements OnInit {
  showH1 = false;
  showH3 = false;
  showOthers = false;
  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {
      this.showH1 = true;
    }, 1000);
  }

}
