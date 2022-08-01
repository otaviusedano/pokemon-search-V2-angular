import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DetailsComponent } from './components/pages/details/details.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent },
  { path: 'details/:pokemon.name', component: DetailsComponent},
  { path: 'about/otaviusedano', component: AboutComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
