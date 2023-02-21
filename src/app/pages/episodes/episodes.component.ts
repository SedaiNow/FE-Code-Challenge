import { Component, OnInit } from '@angular/core';
import {Episode, EpisodesService, InputGetEpisodes} from '../../services/api/episodes/episodes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.less']
})
export class EpisodesComponent {
  episodes: Episode[] = [];
  page = 1;
  maxPage = 1;
  filterInput: InputGetEpisodes = {
    page: this.page
  }
  error?: string;
  constructor(private episodesService: EpisodesService) {this.getEpisodes();}
  getEpisodes() {this.filterInput.page = this.page;this.episodesService.getEpisodes(this.filterInput).then(res => {this.maxPage = res.info.pages;this.episodes = res.results;}).catch(err => {this.error = err;})}
  pageChangeHandler(page: number) {this.page = page;this.getEpisodes();}
}
