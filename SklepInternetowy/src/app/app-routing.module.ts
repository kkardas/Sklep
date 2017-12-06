import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {KoszykComponent} from "./koszyk/koszyk.component";
import {GlownaStronaComponent} from "./glowna-strona/glowna-strona.component";
import {ZamowienieComponent} from "./zamowienie/zamowienie.component";
import {LogowanieComponent} from "./logowanie/logowanie.component";
import {RejestracjaComponent} from "./rejestracja/rejestracja.component";
import {HistoriaComponent} from "./historia/historia.component";

const routes: Routes = [
  {path: 'koszyk', component: KoszykComponent, pathMatch: 'full'},
  {path: 'front', component: GlownaStronaComponent, pathMatch: 'full'},
  {path: 'zamowienie', component: ZamowienieComponent, pathMatch: 'full'},
  {path: 'rejestracja', component: RejestracjaComponent, pathMatch: 'full'},
  {path: 'login', component: LogowanieComponent, pathMatch: 'full'},
  {path: 'historia', component: HistoriaComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
