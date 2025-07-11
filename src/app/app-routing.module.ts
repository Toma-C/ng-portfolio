import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LenguajesformalesComponent} from './pages/lenguajesformales/lenguajesformales.component';

const routes: Routes = [
  {
    path: 'lenguajesformales' ,
    component: LenguajesformalesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
