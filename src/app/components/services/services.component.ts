import { Component, OnInit } from '@angular/core';
import content from "../../jsons/content.json";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  offers: any = [content.offers.slice(0, 3), content.offers.slice(3)];;
  offersMobile = content.offers;
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
