import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { dataService } from '../../_services/data.service';
import { CondaService } from '../../_services/conda.service';
import { UploadFilesService } from '../../_services/upload_file.service';
import { environment } from '../../../environments/environment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-dbsoustracdg',
  templateUrl: './dbsoustracdg.component.html',
  styleUrls: ['./dbsoustracdg.component.scss']
})
export class DbsoustracdgComponent implements OnInit {
  baseUrl = `${environment.apiUrl}/data`;
  showlog: boolean = false;
  ParameterList: any = [];
  ReferencehList: any = [];
  ReferencepList: any = [];
  click: boolean = false;
  dataList: any = [];
  color: any = 'white'
  messageLog: any;
  logCmd: any;
  logConsole: any;
  logCode: any;
  controlButton: boolean = false;
  newParam: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  QcFormControl = this.formBuilder.group({
    parameter: '',
    human: '',
    parasite: '',
    qualtiy: ''
  });
  constructor(private router: Router, private route: ActivatedRoute, private uploadService: UploadFilesService, private formBuilder: FormBuilder, private sequencesService: dataService, private _snackBar: MatSnackBar, private condaService: CondaService) {
  }
  openSnackBar(message: any, min: any) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * min,
    });
  }
  ngOnInit(): void {
    this.listFile()
    this.color = 'white'
  }
  link() {
    this.router.navigate(['/result', { id: 'res_db_sub' }]);
  }
  linkdwn() {
    this.openSnackBar('Downloading.........', 1)
  }
  listFile() {
    this.ReferencehList = []
    this.ReferencepList = []
    this.dataList = []
    this.uploadService.getFiles('ref_hote')
      .subscribe((reponse) => {
        reponse.forEach((data: any) => {
          this.ReferencehList.push(data.fullname)
        })
        console.log(this.ReferencehList)
      });
    this.uploadService.getFiles('ref_patho')
      .subscribe((reponse) => {
        reponse.forEach((data: any) => {
          this.ReferencepList.push(data.fullname)
        })
        console.log(this.ReferencepList)
      });
    this.uploadService.getFiles('vres_qc')
      .subscribe((reponse) => {
        reponse.forEach((data: any) => {
          this.dataList.push(data.fullname)
        })
      });
  }
  onSubmit() {
    //this.showlog = true;
    if (this.QcFormControl.value.parameter != '' || this.QcFormControl.value.human != '' || this.QcFormControl.value.parasite != '' || this.QcFormControl.value.qualtiy != '') {
      this.showlog = true;
      this.color = 'white'
      this.condaService.dbsub(this.QcFormControl.value)
        .subscribe(
          response => {
            this.showlog = false
            switch (response) {
              case "OK": {
                //statements; 
                this.openSnackBar("Fastq finished, download log file", 100)
                this.color = "green"
                break;
              }
              case "OKP": {
                //statements; 
                this.openSnackBar("Delete All Files Before to Run", 100)
                this.color = "yellow"
                break;
              }
              default: {
                this.color = "red"
                break;
              }
            }
            /*
                      if (response == 'OK') {
                        this.openSnackBar("Fastq finished, download log file", 100)
                      } else {
                        this.openSnackBar("Delete All Files Before to Run", 100)
                      }
            */
          }, error => {
            this.showlog = false
            console.log(error);
            console.log(error.error.text);

            switch (error.error.text) {
              case "OK": {
                //statements; 
                this.openSnackBar("Fastq finished, download log file", 100)
                this.color = "green"
                break;
              }
              case "OKP": {
                //statements; 
                this.openSnackBar("Delete All Files Before to Run", 100)
                this.color = "yellow"
                break;
              }
              default: {
                this.openSnackBar("Error Call Administrator", 100)
                this.color = "red"
                break;
              }
            }
          }
        );
    } else {
      this.openSnackBar('Put the Data please', 100);
    }
  }
}
