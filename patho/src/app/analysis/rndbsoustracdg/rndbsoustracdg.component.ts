import { Component, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { UploadFilesService } from '../../_services/upload_file.service';
import { dataService } from '../../_services/data.service';
import { CondaService } from '../../_services/conda.service';
import { Data } from '../../_models/data.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { environment } from '../../../environments/environment';
import { LoggedComponent } from '../../logged/logged.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-rndbsoustracdg',
  templateUrl: './rndbsoustracdg.component.html',
  styleUrls: ['./rndbsoustracdg.component.scss']
})
export class RndbsoustracdgComponent implements OnInit {
  ReferencehList: any = [];
  ReferencepList: any = [];
  displayedColumns: string[] = ['select', 'name', 'url'];
  dataSource!: MatTableDataSource<Data>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  click: boolean = false;
  data!: Data;
  files: any = {};
  color: any = 'white'
  folder: any = 'dbsub';
  folderBoolean: boolean = true;
  selectedFiles?: FileList;
  currentFile?: File;
  progressInfos: any[] = [];
  message: string[] = [];
  param: String = '';
  loaded = true;
  linkqc: any;
  fileInfos?: Observable<any>;
  baseUrl = `${environment.apiUrl}/data`;
  selection = new SelectionModel<Data>(true, []);
  chooseFolder = this.formBuilder.group({
    folder: ''
  });
  showlog: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 100;
  selectFiles(event: any) {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  QcFormControl = this.formBuilder.group({
    // data: [],
    //parameter: '',
    human: '',
    parasite: ''

  });
  listFile() {
    this.ReferencehList = []
    this.ReferencepList = []
    /*  this.dataList = [] */
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
    /*  this.uploadService.getFiles('vres_qc')
       .subscribe((reponse) => {
         reponse.forEach((data: any) => {
           this.dataList.push(data.fullname)
         })
       }); */
  }
  getFolder() {
    this.selection.clear();
    this.folder = this.chooseFolder.value.folder;
    console.log(this.folder);
    this.uploadService.getFiles(this.folder)
    this.folder == 'dbsub'
    this.folderBoolean = true;
    this.chargedTableList(this.folder);
  }
  chargedTableList(folder: string) {
    // this.log='';
    this.loaded = true;
    this.uploadService.getFiles(folder)
      .subscribe((filesDatas: Data[]) => {
        console.log(filesDatas)
        this.dataSource = new MatTableDataSource<Data>(filesDatas);
      });
    this.loaded = false;
  }
  uploadFiles() {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  upload(idx: number, file: File) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.uploadService.upload(file, this.folder).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.chargedTableList('dbsub');
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          this.chargedTableList('dbsub');
        });
    }

  }
  link() {
    this.openSnackBar('Result', 1)
    this.router.navigate(['/result', { id: 'res_db_sub' }]);
  }
  linkdwn() {
    this.openSnackBar('Downloading.........', 1)
  }



  constructor(private _snackBar: MatSnackBar, private logged: LoggedComponent, private router: Router, private route: ActivatedRoute, public sanitizer: DomSanitizer, private formBuilder: FormBuilder, private condaService: CondaService, private uploadService: UploadFilesService, private sequencesService: dataService) {

  }
  openSnackBar(message: any, min: any) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * min,
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  isAllSelected() {
    let val;
    let num;
    num = this.selection.selected.length;
    val = this.dataSource.data.length;
    const numSelected = num
    const numRows = val
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Data): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }
  rerunDbs() {
    //this.showlog = true
    let tables: any = [];
    this.selection.selected.forEach((data: Data) => {
      tables.push(data.fullname)
    })
    console.log(this.QcFormControl.value, tables.length)
    if (this.QcFormControl.value.human == "undefined" || this.QcFormControl.value.parasite == "undefined" || this.QcFormControl.value.human == "" || this.QcFormControl.value.parasite == "") {
      this.openSnackBar('Select References ....', 10)
    } else {
      if (tables.length <= 0) {
        this.openSnackBar('Select Data ....', 10)
      } else {
        this.showlog = true
        this.color = 'white'
        this.condaService.redbsub(tables, this.QcFormControl.value)
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
    }
    /*  
      */
  }
  delete() {
    let tables: any = [];
    this.selection.selected.forEach((data: Data) => {
      tables.push(data)
    })
    this.uploadService.deleteFiles(tables, this.folder)
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar("File Delete", 35)
          this.chargedTableList('dbsub')
        }, error => {
          console.log(error);
          this.openSnackBar("error", 35)
          this.chargedTableList('dbsub')
        }
      );
    console.log(tables.length)
    this.selection.clear();
    tables = []

  }
  ngOnInit(): void {
    // this.showlog = true
    this.folder = 'dbsub';
    this.chargedTableList('dbsub')
    this.linkqc = ''
    this.listFile()
    this.color = 'white'
  }


}


