import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { dataService } from '../../_services/data.service';
import { UploadFilesService } from '../../_services/upload_file.service';
import { CondaService } from '../../_services/conda.service';
import { environment } from '../../../environments/environment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-qualitycontrol',
  templateUrl: './qualitycontrol.component.html',
  styleUrls: ['./qualitycontrol.component.scss']
})
export class QualitycontrolComponent implements OnInit {
  baseUrl = `${environment.apiUrl}/data`;
  ParameterList: any = [];
  ReferenceList: any = [];
  dataList: any = [];
  color: any = 'white'
  showlog: boolean = false;
  controlButton: boolean = false;
  newParam: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  ParameterFormControl = this.formBuilder.group({
    fullname: '',
    trim_front1: 0,
    trim_front2: 0,
    trim_tail1: 0,
    trim_tail2: 0,
    n_base_limit: 0,
    max_lg: 0,
    max_ql: 0,
    type: "qc"
  });
  QcFormControl = this.formBuilder.group({
    // data: [[], Validators.required],
    parameter: ['', Validators.required]
  });
  constructor(private upload: UploadFilesService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private sequencesService: dataService, private _snackBar: MatSnackBar, private condaService: CondaService) {
  }
  openSnackBar(message: any, min: any) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * min,
    });
  }
  link() {
    this.router.navigate(['/result', { id: 'res_qc' }]);
  }
  linkdwn() {
    this.openSnackBar('Downloading.........', 1)
  }
  ngOnInit(): void {
    this.listFile()
    this.color = 'white'
  }
  listFile() {
    this.ParameterList = []
    this.dataList = []
    this.sequencesService.listParam()
      .subscribe((reponse) => {
        reponse.forEach((data: any) => {
          this.ParameterList.push(data.fullname)
        })
        console.log(this.ParameterList)
      });
    this.upload.getFiles('data')
      .subscribe((reponse) => {
        reponse.forEach((data: any) => {
          this.dataList.push(data.fullname)
        })
      });
  }
  onChangeParameter() {
    //this.ParameterFormControl.valueChanges.fullname
    if (this.ParameterFormControl.value.fullname == "new") {
      this.newParam = true
      //  this.checkoutForm.reset();
      ///console.log(this.ParameterFormControl.value)
    } else {
      this.newParam = false
      this.sequencesService.getParam(this.ParameterFormControl.value.fullname)
        .subscribe((reponse) => {
          console.log(reponse)
          this.ParameterFormControl.controls['trim_front1'].setValue(reponse.trim_front1);
          this.ParameterFormControl.controls['trim_front2'].setValue(reponse.trim_front2);
          this.ParameterFormControl.controls['trim_tail1'].setValue(reponse.trim_tail1);
          this.ParameterFormControl.controls['trim_tail2'].setValue(reponse.trim_tail2);
          this.ParameterFormControl.controls['n_base_limit'].setValue(reponse.n_base_limit);
          this.ParameterFormControl.controls['max_lg'].setValue(reponse.max_lg);
          this.ParameterFormControl.controls['max_ql'].setValue(reponse.max_ql);
        });
    }

    //console.log(this.ParameterList) */
  }

  delete() {
    console.log(this.ParameterFormControl.value.fullname)
    this.sequencesService.deleteParam(this.ParameterFormControl.value.fullname)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar(response.msg, 100)
          this.listFile()
        }, error => {
          console.log(error);
          this.openSnackBar("error", 100)
        }
      );
  }
  update() {
    console.log(this.ParameterFormControl.value)
    this.sequencesService.updateParam(this.ParameterFormControl.value)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar(response.msg, 100)
          this.listFile()
        }, error => {
          console.log(error);
          this.openSnackBar("error", 100)
        }
      );
  }
  add() {
    if (this.ParameterFormControl.value.fullname != 'new') {
      console.log(this.ParameterFormControl.value)
      this.sequencesService.createParam(this.ParameterFormControl.value)
        .subscribe(
          response => {
            console.log(response);
            this.openSnackBar(response.msg, 100)
            this.listFile()
          }, error => {
            console.log(error);
            this.openSnackBar("error", 100)
          }
        );
    } else {
      this.openSnackBar('Rename your parameter', 40);
    }
  }

  onSubmit() {
    if (this.QcFormControl.value.parameter != '') {
      this.showlog = true
      this.color = 'white'
      this.condaService.qc(this.QcFormControl.value)
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
                      }*/
          }, error => {
            this.showlog = false
            console.log(error);
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
