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
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-mngdataread',
  templateUrl: './mngdataread.component.html',
  styleUrls: ['./mngdataread.component.scss']
})

export class MngdatareadComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'url'];
  dataSource!: MatTableDataSource<Data>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  click: boolean = false;
  data!: Data;
  files: any = {};
  folder: any = 'data';
  color: any = 'white'
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

  selected = new FormControl([Validators.required/*, Validators.pattern('valid')*/]);

  selectFormControl = new FormControl([Validators.required]);
  showlog: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 100;
  selectFiles(event: any) {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  getFolder() {
    this.selection.clear();
    this.folder = this.chooseFolder.value.folder;
    console.log(this.folder);
    this.uploadService.getFiles(this.folder)
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
    if (this.folder == "vide") {
      this.openSnackBar('Selecting the analysis directory', 15)
    } else {
      this.message = [];
      if (this.selectedFiles) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.upload(i, this.selectedFiles[i]);
        }
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
            this.chargedTableList(this.folder);
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          this.chargedTableList(this.folder);
        });
    }

  }
  link() {
    this.openSnackBar('Result', 1)
    this.router.navigate(['/result', { id: 'res_fastq' }]);
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
  fastqc() {
    this.showlog = true
    this.color = 'white'
    let tables: any = [];
    this.selection.selected.forEach((data: Data) => {
      tables.push(data.url)
    })

    if (tables.length > 0) {
      this.condaService.fastqc(tables)
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
      this.openSnackBar("Selected samples", 100)
      this.showlog = false
    }
  }


  multiqc() {
    this.showlog = true
    this.color = 'white'
    let tables: any = [];
    this.selection.selected.forEach((data: Data) => {
      tables.push(data.url)
    })

    //if (tables.length > 0) {
    this.condaService.multiqc(tables)
      .subscribe(
        response => {
          this.showlog = false
          switch (response) {
            case "OK": {
              //statements; 
              this.openSnackBar("MultiQC finished, download log file", 100)
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
          switch (error.error.text) {
            case "OK": {
              //statements; 
              this.openSnackBar("MultiQC finished, download log file", 100)
              this.color = "green"
              break;
            }
            case "OKP": {
              //statements; 
              this.openSnackBar("MultiQC All Files Before to Run", 100)
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
    /*   } else {
         this.openSnackBar("Selected samples", 100)
         this.showlog = false
       }*/
  }
  delete() {
    let tables: any = [];
    this.selection.selected.forEach((data: Data) => {
      tables.push(data)
    })

    if (tables.length > 0) {

      this.uploadService.deleteFiles(tables, this.folder)
        .subscribe(
          response => {
            console.log(response);
            this.openSnackBar("File Delete", 100)
            this.chargedTableList(this.folder);
          }, error => {
            console.log(error);
            this.openSnackBar("error", 100)
            this.chargedTableList(this.folder);
          }
        );
      console.log(tables.length)
      this.selection.clear();
      tables = []
    } else {
      this.openSnackBar("Selected samples", 100)
      this.showlog = false
    }
  }
  ngOnInit(): void {
    this.folder = 'dataqc';
    this.chargedTableList(this.folder)
    this.linkqc = ''
    this.color = 'white'
    //this.showlog = true
  }


}
