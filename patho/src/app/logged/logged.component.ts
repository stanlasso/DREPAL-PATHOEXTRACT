import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { dataService } from '../_services/data.service';
import { CondaService } from '../_services/conda.service';
import { UploadFilesService } from '../_services/upload_file.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { Data } from '../_models/data.model';
@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
@Injectable({ providedIn: 'root' })
export class LoggedComponent implements OnInit {
  ParameterList: any = [];
  ReferencehList: any = [];
  ReferencepList: any = [];
  dataList: any = [];
  public messageLog: any;
  controlButton: boolean = false;
  newParam: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  baseUrl = `${environment.apiUrl}/data`;
  click: boolean = false;

  constructor(private service: CondaService, private router: Router, private route: ActivatedRoute, private uploadService: UploadFilesService, private formBuilder: FormBuilder, private sequencesService: dataService, private _snackBar: MatSnackBar, private condaService: CondaService) {
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  ngOnInit(): void {

  }
  ngsFunctionQc(data: any) {
    this.condaService.qc(data)
      .subscribe(
        response => {
          console.log(response);
        }, error => {
        }
      );
  }
  ngsFunctionFastq(tables: any) {
    console.log('log', tables);
    this.messageLog = tables
  }
  ngsFunctionDbsub(tables: any) {
    this.service.dbsub(tables)
      .subscribe(
        response => {
          console.log(response);
        }, error => {
        }
      );
  }
  ngsFunctionPipe(tables: any) {
    this.service.pipe(tables)
      .subscribe(
        response => {
          console.log(response);
        }, error => {
        }
      );
  }
  ngsFunctionIndexH(data: Data, hote: String) {
    this.service.indexh(data, hote)
      .subscribe(
        response => {
          console.log(response);
        }, error => {
        }
      );
  }
  ngsFunctionIndexP(data: Data, hote: String) {
    this.service.indexp(data, hote)
      .subscribe(
        response => {
          console.log(response);
        }, error => {
        }
      );
  }
  deleteNgsFile(folder: any) {
    let tables: any = [];
    this.uploadService.deleteFiles(tables, folder)
      .subscribe(
        response => {
          console.log(response);
          // this.chargedTableList('data')
        }, error => {
          console.log(error);
          //  this.chargedTableList('data')
        }
      );
    console.log(tables.length)
    // this.selection.clear();
    tables = []
  }
  link(link : any) {
   // this.router.navigate(['/result', { id: 'res_db_sub' }]);
   console.log('link..',link)
  }

  runseqkit() {
    this.controlButton = true;
    this.condaService.stat()
      .subscribe(
        response => {
          this.controlButton = false;
          console.log(response);
          this.openSnackBar('Statistic succefuly');
        }, error => {
          this.controlButton = false;
          console.log(error);
          this.openSnackBar('Error, Try again');
        }
      );
  }
}
