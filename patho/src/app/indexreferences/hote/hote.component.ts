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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-hote',
  templateUrl: './hote.component.html',
  styleUrls: ['./hote.component.scss']
})
export class HoteComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'url'];
  dataSource!: MatTableDataSource<Data>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  click: boolean = false;
  data!: Data;
  files: any = {};
  folder: any = 'ref_hote';
  folderBoolean: boolean = true;
  selectedFiles?: FileList;
  color: any = 'white'
  currentFile?: File;
  progressInfos: any[] = [];
  message: string[] = [];
  param: String = '';
  fileInfos?: Observable<any>;

  logCmd: any = [];
  logConsole: any = [];
  logCode: any = [];
  loaded = false;
  selection = new SelectionModel<Data>(true, []);
  chooseFolder = this.formBuilder.group({
    folder: ''
  });
  baseUrl = `${environment.apiUrl}/data`;
  showlog: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 100;
  link() {
    this.openSnackBar('Result', 1)
    this.router.navigate(['/result', { id: 'res_db_sub' }]);
  }
  linkdwn() {
    this.openSnackBar('Downloading.........', 1)
  }
  openSnackBar(message: any, min: any) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * min,
    });
  }
  selectFiles(event: any) {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  getFolder() {
    this.logCmd = '';
    this.selection.clear();
    this.folder = this.chooseFolder.value.folder;
    console.log(this.folder);
    this.uploadService.getFiles(this.folder)
    this.folder == 'ref_hote'
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
            /*
                        this.data.name=file.name;
                        this.data.url=file.
                          this.datasService.add(file, this.folder).subscribe(*/
            this.message.push(msg);
            this.chargedTableList('ref_hote');
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          this.chargedTableList('ref_hote');
        });
    }

  }

  constructor(private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, public sanitizer: DomSanitizer, private formBuilder: FormBuilder, private condaService: CondaService, private uploadService: UploadFilesService, private datasService: dataService) {
    /* this.uploadService.getFiles(this.folder)
       .subscribe((filesDatas: Data[]) => {
         console.log(filesDatas)
         this.dataSource = new MatTableDataSource<Data>(filesDatas);
       });*/
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
  index() {
    let tables: any = [];
    this.selection.selected.forEach((data: Data) => {
      tables.push(data.fullname)
    })
    console.log(tables.length)
    if (tables.length == 0) {
    } else {
      this.showlog = true
      this.click = true;
      this.loaded = true;
      this.logCmd = ''; this.logConsole = ''; this.logCode = '';
      this.condaService.indexh(tables, 'hote')
        .subscribe(
          response => {
            this.showlog = false
            this.color = 'white'
            switch (response) {
              case "OK": {
                //statements; 
                this.logConsole = response.message;
                this.chargedTableList('ref_hote')
                this.openSnackBar("Fastq finished, download log file", 100)
                this.color = "green"
                break;
              }
              case "OKP": {
                //statements; 
                this.logConsole = response.message;
                this.chargedTableList('ref_hote')
                this.openSnackBar("Delete All Files Before to Run", 100)
                this.color = "yellow"
                break;
              }
              default: {

                this.chargedTableList('ref_hote')
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

    /*}*/
  }
  check() {
    let tables: any = [];
    this.selection.selected.forEach((data: Data) => {
      tables.push(data.url)
    })
    console.log(tables.length)
    if (tables.length == 1) {
      this.showlog = true
      this.click = true;
      this.loaded = true;
      this.logCmd = ''; this.logConsole = ''; this.logCode = '';
      this.condaService.checkg(tables, 'hote')
        .subscribe(
          response => {
            this.showlog = false
            this.color = 'white'
            switch (response) {
              case "OK": {
                //statements; 
                this.logConsole = response.message;
                this.chargedTableList('ref_hote')
                this.openSnackBar("The file has been successfully indexed", 100)
                this.color = "green"
                break;
              }
              case "KO": {
                //statements; 
                this.logConsole = response.message;
                this.chargedTableList('ref_hote')
                this.openSnackBar("reindex the file.", 100)
                this.color = "red"
                break;
              }
              default: {
                this.chargedTableList('ref_hote')
                this.color = "red"
                break;
              }
            }
          }, error => {
            this.showlog = false
            this.color = 'white'
            this.openSnackBar(error.error.text, 100)
            switch (error.error.text) {
              case "OK": {
                //statements; 
                this.logConsole = error.error.text;
                this.chargedTableList('ref_hote')
                this.openSnackBar("The file has been successfully indexed", 100)
                this.color = "green"
                break;
              }
              case "KO": {
                //statements; 
                this.logConsole = error.error.text
                this.chargedTableList('ref_hote')
                this.openSnackBar("reindex the file.", 100)
                this.color = "red"
                break;
              }
              default: {
                this.chargedTableList('ref_hote')
                this.openSnackBar("Call administrateur.", 100)
                this.color = "red"
                break;
              }
            }
          }
        );
    } else {
      this.openSnackBar("Select one file", 100)
    }

    /*}*/
  }


  delete() {
    let tables: any = [];
    this.logCmd = '';
    this.logConsole = '';
    this.logCode = '';
    this.selection.selected.forEach((data: Data) => {
      tables.push(data)
    })
    this.uploadService.deleteFiles(tables, 'hote')
      .subscribe(
        response => {
          console.log(response);
          this.openSnackBar("File Delete", 100)
          this.chargedTableList('data')
        }, error => {
          console.log(error);
          this.openSnackBar("error", 100)
          this.chargedTableList('data')
        }
      );
    console.log(tables.length)
    this.selection.clear();
    tables = []
  }
  ngOnInit(): void {
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    //  this.fileInfos = this.uploadService.getFiles('data');

    //this.showlog = true
    this.folder = 'ref_hote';
    /* this.uploadService.getFiles('data')
      .subscribe((filesDatas: Data[]) => {
        console.log(filesDatas)
        this.dataSource = new MatTableDataSource<Data>(filesDatas);
      }); */
    this.chargedTableList('ref_hote')

    /*   this.route.queryParams.subscribe(params => {
        this.param = params['id'];
      });
      console.log(this.param) */
  }


}
