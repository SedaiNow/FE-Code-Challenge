import {Injectable} from '@angular/core';
import {AppConsts} from '../../globals/appConsts';

export interface ApiResponse<T = any> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export interface FilterObject {
  [prop: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {
  protected resourceName: string = '';

  getAll(filters: FilterObject): Promise<ApiResponse> {
    return fetch(`${AppConsts.apiBaseUrl}/${this.resourceName}/${this.createQueryFilters(filters)}`).then(res => res.json());
  }

  getItem(id: number): Promise<any> {
    return fetch(`${AppConsts.apiBaseUrl}/${this.resourceName}/${id}`).then(res => res.json());
  }

  protected createQueryFilters(filterParams: FilterObject): string {
    const filters: string[] = [];
    for(let prop in filterParams) {
      const value = filterParams[prop];
      if(filterParams.hasOwnProperty(prop)
        && (typeof value === 'string' || typeof value === 'number')
      ) {
        filters.push(`${prop}=${value}`);
      }
    }
    if(!filters.length) {
      return '';
    }
    return '?' + filters.join('&');
  }
}
