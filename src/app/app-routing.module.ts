import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDetailsComponent } from './components/list-details/list-details.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  // {path: '', pathMatch:"full", redirectTo: 'map'},
  {path: '', component: MapComponent, children: [
    {path: 'map/:id', component: ListDetailsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
