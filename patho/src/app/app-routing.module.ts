import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { DbsoustracdgComponent } from './analysis/dbsoustracdg/dbsoustracdg.component';
import { MngdatareadComponent } from './analysis/mngdataread/mngdataread.component';
import { QualitycontrolComponent } from './analysis/qualitycontrol/qualitycontrol.component';
import { ResultsComponent } from './analysis/results/results.component';
import { AppComponent } from './app.component';
import { HoteComponent } from './indexreferences/hote/hote.component';
import { IndexreferencesComponent } from './indexreferences/indexreferences.component';
import { PathogeneComponent } from './indexreferences/pathogene/pathogene.component';
import { LoggedComponent } from './logged/logged.component';
import { AuthGuard } from '../app/_services/auth-guard.service';
import { ChartsComponent } from './charts/charts.component';
import { RndbsoustracdgComponent } from './analysis/rndbsoustracdg/rndbsoustracdg.component';
import { DocComponent } from './documentation/doc/doc.component';
import { GenconsensusComponent } from './analysis/genconsensus/genconsensus.component';

const routes: Routes = [
//  { path: '/', component: LoggedComponent },
  { path: 'stat', component: ChartsComponent },
  { path: 'home', component: LoggedComponent },
  { path: '', component: LoggedComponent },
  { path: 'reads', component: MngdatareadComponent, canActivate: [AuthGuard] },
  { path: 'qc', component: QualitycontrolComponent, canActivate: [AuthGuard] },
  { path: 'db', component: DbsoustracdgComponent, canActivate: [AuthGuard] },
  { path: 'redb', component: RndbsoustracdgComponent,canActivate:[AuthGuard]},
  { path: 'gcons', component: GenconsensusComponent,canActivate:[AuthGuard]},
  { path: 'result', component: ResultsComponent, canActivate: [AuthGuard] },
  { path: 'pipeline', component: AnalysisComponent, canActivate: [AuthGuard] },
  { path: 'indexh', component: HoteComponent, canActivate: [AuthGuard] },
  { path: 'indexp', component: PathogeneComponent, canActivate: [AuthGuard] },
  { path: 'document', component: DocComponent, canActivate: [AuthGuard] },
  /* { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
