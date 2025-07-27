import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LenguajesformalesComponent} from './pages/lenguajesformales/lenguajesformales.component';
import {ListaComponent} from './pages/lista/lista.component';
import {ReversiComponent} from './pages/reversi/reversi.component';
import {P5TestComponent} from './pages/p5-test/p5-test.component';
import {ApiExampleComponent} from './pages/api-example/api-example.component';

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
  },
  {
    path: 'p5-test' ,
    component: P5TestComponent
  },
  {
    path: 'api-example' ,
    component: ApiExampleComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
