import { Component, OnInit } from '@angular/core';
import content from "../../jsons/content.json";


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  brandImages = content.brandImages;

  constructor() { }

  ngOnInit(): void {
  }

}
