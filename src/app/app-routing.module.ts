import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LenguajesformalesComponent} from './pages/lenguajesformales/lenguajesformales.component';
import {ListaComponent} from './pages/lista/lista.component';
import {ReversiComponent} from './pages/reversi/reversi.component';

const routes: Routes = [
  {
    path: 'lenguajesformales' ,
    component: LenguajesformalesComponent
  },
  {
    path: 'lista' ,
    component: ListaComponent
  },
  {
    path: 'reversi' ,
    component: ReversiComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
