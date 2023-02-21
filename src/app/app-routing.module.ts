import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {CharactersComponent} from './pages/characters/characters.component';
import {LocationsComponent} from './pages/locations/locations.component';
import {EpisodesComponent} from './pages/episodes/episodes.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'episodes',
    component: EpisodesComponent
  },
  {
    path: 'contact',
    loadChildren: () => import('../app/pages/contact/contact.module').then(m => m.ContactModule)
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
