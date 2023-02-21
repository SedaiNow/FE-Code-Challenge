import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { LocationsComponent } from './pages/locations/locations.component';
import {CharactersService} from './services/api/characters/characters.service';
import {LocationsService} from './services/api/locations/locations.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharactersComponent,
    LocationsComponent,
    PaginationComponent,
    EpisodesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [CharactersService, LocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
