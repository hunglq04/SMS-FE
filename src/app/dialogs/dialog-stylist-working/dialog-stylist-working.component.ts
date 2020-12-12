import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-stylist-working',
  templateUrl: './dialog-stylist-working.component.html',
  styleUrls: ['./dialog-stylist-working.component.css']
})
export class DialogStylistWorkingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getImageUrl(imageUrl) {
    console.log(imageUrl)
  }

}
