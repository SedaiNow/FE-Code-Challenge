import { Injectable } from '@angular/core';
import {ApiBaseService, ApiResponse} from '../api-base.service';

interface LocationOrigin {
  name: string;
  url: string;
}

export interface Character {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: LocationOrigin,
  location: LocationOrigin,
  image: string,
  episode: string[],
  url: string,
  created: string;
}

export enum CharacterStatus {
  alive = 'alive',
  dead = 'dead',
  unknown = 'unknown'
}

export enum CharacterGender {
  female = 'female',
  male = 'male',
  genderless = 'genderless',
  unknown = 'unknown'
}

export interface InputGetCharacters {
  page: number;
  name?: string;
  status?: CharacterStatus;
  species?: string;
  type?: string;
  gender?: CharacterGender;
}

@Injectable({
  providedIn: 'root'
})
export class CharactersService extends ApiBaseService {
  override resourceName = 'character';

  getCharacters(input: InputGetCharacters): Promise<ApiResponse<Character>> {
    return this.getAll(input);
  }

  getCharacter(id: number): Promise<Character> {
    return this.getItem(id);
  }
}
