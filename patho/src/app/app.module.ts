import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexreferencesComponent } from './indexreferences/indexreferences.component';
import { HoteComponent } from './indexreferences/hote/hote.component';
import { PathogeneComponent } from './indexreferences/pathogene/pathogene.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { MngdatareadComponent } from './analysis/mngdataread/mngdataread.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QualitycontrolComponent } from './analysis/qualitycontrol/qualitycontrol.component';
import { DbsoustracdgComponent } from './analysis/dbsoustracdg/dbsoustracdg.component';
import { ResultsComponent } from './analysis/results/results.component'; 
import { NgxEchartsModule } from 'ngx-echarts';
import {MatTabsModule} from '@angular/material/tabs';
import { LoggedComponent } from './logged/logged.component';
import { ChartsComponent } from './charts/charts.component';
import { RndbsoustracdgComponent } from './analysis/rndbsoustracdg/rndbsoustracdg.component';
import { DocComponent } from './documentation/doc/doc.component';
import { GenconsensusComponent } from './analysis/genconsensus/genconsensus.component';
import {MatStepperModule} from '@angular/material/stepper';
//import { saveAs } from 'file-saver';
@NgModule({
  declarations: [
    AppComponent,
    IndexreferencesComponent,
    HoteComponent,
    PathogeneComponent,
    AnalysisComponent,
    MngdatareadComponent,
    QualitycontrolComponent,
    DbsoustracdgComponent,
    ResultsComponent,
    LoggedComponent,
    ChartsComponent,
    RndbsoustracdgComponent,
    DocComponent,
    GenconsensusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    BrowserModule, 
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatChipsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTabsModule,
    MatStepperModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
