import { Component, OnInit } from '@angular/core';
import {InputGetLocations, Location, LocationsService} from '../../services/api/locations/locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.less']
})
export class LocationsComponent {
  locations: any = [];
  page = 1;
  maxPage = 1;
  filterInput: InputGetLocations = {
    page: this.page
  }
  error?: string;

  constructor(
    private locationsService: LocationsService
  ) { }

  ngOnInit(): void {
    this.filterInput.page = this.page;
    this.locationsService.getLocations(this.filterInput).then(res => {
      this.maxPage = res.info.pages;
      this.locations = res.results;
    }).catch(err => {
      this.error = err;
    })
  }

  pageChangeHandler(page: number) {
    this.page = page;
  }
}
