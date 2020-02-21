import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroEditorComponent } from './hero-editor/hero-editor.component';
import {ArmesComponent} from './armes/armes.component';
import {ArmeDetailComponent} from './arme-detail/arme-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detailHero/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroEditor', component: HeroEditorComponent },
  { path: 'armes', component: ArmesComponent},
  { path: 'detailArme/:id', component: ArmeDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
