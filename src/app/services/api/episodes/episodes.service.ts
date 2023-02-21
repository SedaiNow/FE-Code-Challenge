import { Injectable } from '@angular/core';
import {ApiBaseService, ApiResponse} from '../api-base.service';

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface InputGetEpisodes {
  page: number;
  name?: string;
  episode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EpisodesService extends ApiBaseService {
  override resourceName = 'episode';

  getEpisodes(input: InputGetEpisodes): Promise<ApiResponse<Episode>> {
    return this.getAll(input);
  }

  getEpisode(id: number): Promise<Episode> {
    return this.getItem(id);
  }
}
