import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {ProduktComponent} from './produkt/produkt.component';
import {PasekBocznyComponent} from './pasek-boczny/pasek-boczny.component';
import {ListaGlownaComponent} from './lista-glowna/lista-glowna.component';
import {KoszykComponent} from './koszyk/koszyk.component';
import {GlownaStronaComponent} from './glowna-strona/glowna-strona.component';
import {KoszykService} from "./koszyk.service";
import {ProduktService} from "./produkt.service";
import {AppRoutingModule} from './/app-routing.module';
import {PasekGornyComponent} from './pasek-gorny/pasek-gorny.component';
import {ProduktWkoszykuComponent} from './produkt-wkoszyku/produkt-wkoszyku.component';
import {ZamowienieComponent} from './zamowienie/zamowienie.component';
import {HttpModule} from "@angular/http";
import {HttpClientModule} from "@angular/common/http";
import {ZamowienieService} from "./zamowienie.service";
import { KaruzelaComponent } from './karuzela/karuzela.component';
import { ModalComponent } from './modal/modal.component';
import {ModalService} from "./modal.service";
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { LogowanieComponent } from './logowanie/logowanie.component';
import {RejestracjaService} from "./rejestracja.service";
import {LogowanieService} from "./logowanie.service";
import { HistoriaComponent } from './historia/historia.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduktComponent,
    PasekBocznyComponent,
    ListaGlownaComponent,
    KoszykComponent,
    GlownaStronaComponent,
    PasekGornyComponent,
    ProduktWkoszykuComponent,
    ZamowienieComponent,
    KaruzelaComponent,
    ModalComponent,
    RejestracjaComponent,
    LogowanieComponent,
    HistoriaComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [KoszykService,
              ProduktService,
              ZamowienieService,
              ModalService,
              RejestracjaService,
              LogowanieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
