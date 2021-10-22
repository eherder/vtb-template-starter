import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PricesService } from 'src/app/services/prices.service';

@Component({
  selector: 'app-template',
  templateUrl: './minisite.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinisiteComponent implements OnInit {

  itinerary: any;
  showMobileMenu: boolean;
  location;

  constructor(private _activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, private pricesService:PricesService) {
    const data = this._activatedRoute.snapshot.data;
    this.location = document.location.href;
    this.itinerary = this.pricesService.init(data.itinerary);
    console.log(this.itinerary);
  }

  trackByFn(index, item)
  {
    return index;
  }

  ngOnInit() {
  }

  // setRequired(blockID, lineID) 
  // {
  //   this.itinerary = this.pricesService.setRequired(this.itinerary, blockID, lineID);
  //   console.log(this.itinerary);
  //   this.cdr.detectChanges();
  // }


}
