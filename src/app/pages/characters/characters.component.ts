import {Component, OnInit} from '@angular/core';
import {
  Character, CharacterGender,
  CharactersService,
  InputGetCharacters
} from '../../services/api/characters/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.less']
})
export class CharactersComponent {
  characters: any[] = [];
  page = 1;
  maxPage = 1;
  filterInput: InputGetCharacters = {
    page: this.page
  }
  error?: string;

  constructor(
    private charactersService: CharactersService
  ) {
    this.getCharacters();}

  getCharacters() {
    this.filterInput.page = this.page;
    this.charactersService.getCharacters(this.filterInput).then(res => {
      this.maxPage = res.info.pages;
      this.characters = res.results;
    }).catch(err => {
      this.error = err;
    })
  }

  pageChangeHandler(page: number) {
    this.page = page;
    this.getCharacters();
  }


  getGenderIcon(character: Character): string {
    console.log('getGenderIcon')
    const gender = character.gender.toLowerCase();
    switch (gender) {
      case CharacterGender.male:
        return `&#9794;`;
      case CharacterGender.female:
        return `&#9792;`;
      case CharacterGender.unknown:
        return '?';
      case CharacterGender.genderless:
        return 'N/A';
    }
    return '-';
  }

  getClassNameByGender(character: Character): string {
    console.log('getClassNameByGender')
    const gender = character.gender.toLowerCase();
    switch (gender) {
      case CharacterGender.male:
        return 'male';
      case CharacterGender.female:
        return 'female';
    }
    return '';
  }
}
