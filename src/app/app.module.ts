import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { GridRowComponent } from './grid-row/grid-row.component';
import { GridCComponent } from './grid-c/grid-c.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BioComponent } from './bio/bio.component';
import { AccordionComponent } from './accordion/accordion.component';
import { LenguajesformalesComponent } from './pages/lenguajesformales/lenguajesformales.component';
import { AutomataComponent } from './pages/lenguajesformales/automata/automata.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    GridRowComponent,
    GridCComponent,
    BioComponent,
    AccordionComponent,
    LenguajesformalesComponent,
    AutomataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
