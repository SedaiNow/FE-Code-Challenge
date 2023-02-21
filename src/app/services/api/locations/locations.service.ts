import { Injectable } from '@angular/core';
import {ApiBaseService, ApiResponse} from '../api-base.service';

export interface Location {
  id: number,
  name: string,
  type: string,
  dimension: string,
  residents: string[],
  url: string,
  created: string;
}

export interface InputGetLocations {
  page: number;
  name?: string;
  type?: string;
  dimension?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationsService extends ApiBaseService {
  override resourceName = 'location';

  getLocations(input: InputGetLocations): Promise<ApiResponse<Location>> {
    return this.getAll(input);
  }

  getLocation(id: number): Promise<Location> {
    return this.getItem(id);
  }
}
