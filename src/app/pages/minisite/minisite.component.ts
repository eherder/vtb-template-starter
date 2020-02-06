import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgmMap } from '@agm/core';
import { PricesService } from 'src/app/services/prices.service';

@Component({
  selector: 'app-template',
  templateUrl: './minisite.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinisiteComponent implements OnInit {
  itinerary: any;
  showMobileMenu: boolean;

  @ViewChildren(AgmMap) public maps;

  constructor(private _activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, private pricesService:PricesService) {
    const data = this._activatedRoute.snapshot.data;
    this.itinerary = this.pricesService.init(data.itinerary);
  }

  setRequired(data)
  {
    this.itinerary = this.pricesService.setRequired(this.itinerary, data);
    this.cdr.detectChanges();
  }

  ngOnInit() {
  }

}
