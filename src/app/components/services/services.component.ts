import { Component, OnInit } from '@angular/core';
import content from "../../jsons/content.json";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  offers = content.offers;
  animateAfterViewInit = false;

  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateAfterViewInit = true;
    }, 200);
  }

}
