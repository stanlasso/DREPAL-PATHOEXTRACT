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

import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-genconsensus',
  templateUrl: './genconsensus.component.html',
  styleUrls: ['./genconsensus.component.scss']
})
export class GenconsensusComponent implements OnInit {

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
  constructor(private router: Router, private route: ActivatedRoute, private uploadService: UploadFilesService, private formBuilder: FormBuilder, private sequencesService: dataService, private _snackBar: MatSnackBar, private condaService: CondaService, private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    depth: ['', Validators.required],
    quality: ['', Validators.required],
    ploidy: ['', Validators.required]
  });
  thirdFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isOptional = false;
  stepperOrientation: Observable<StepperOrientation>;
  generate_reference() {
    if (this.firstFormGroup.value.firstCtrl != '') {
      this.showlog = true;
      this.color = 'white'
      this.condaService.gncons1(this.firstFormGroup.value)
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
      this.showlog = false
    }
  }
  generate_cons() {
    this.showlog = true;
    this.color = 'white'
    console.log(this.secondFormGroup.value)
    //if (this.thirdFormGroup.value.depth != '' || this.thirdFormGroup.value.quality != '') {
    this.condaService.gncons2(this.secondFormGroup.value)
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
    /*  } else {
        this.openSnackBar('Put the Data please', 100);
        this.showlog = false
      }*/
  }

  generate_final() {
    this.showlog = true;
    this.color = 'white'
    this.condaService.gncons(this.firstFormGroup.value)
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
  }
  /*generate_bam() {
    this.showlog = true;
    this.color = 'white'
    this.condaService.gncons4(this.firstFormGroup.value)
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
  }
  generate_vcf() {
    this.showlog = true;
    this.color = 'white'
    this.condaService.gncons5(this.firstFormGroup.value)
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
  }*/
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
    this.router.navigate(['/result', { id: 'res_cons' }]);
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
          this.ReferencehList.push(data.url)
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
    if (this.QcFormControl.value.parasite != '') {
      this.showlog = true;
      this.color = 'white'
      this.condaService.gncons(this.QcFormControl.value)
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
