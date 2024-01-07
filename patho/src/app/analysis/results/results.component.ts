import { Component, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StuffService } from '../../_services/stuff.service';
import { Data } from '../../_models/data.model';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder } from '@angular/forms';
import { UploadFilesService } from '../../_services/upload_file.service';
import { dataService } from '../../_services/data.service';
import { CondaService } from '../../_services/conda.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit {
  baseUrl = `${environment.apiUrl}/data`;
  url: boolean = false;
  displayedColumns: string[] = ['select', 'name', 'url'];
  resSource!: MatTableDataSource<Data>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  click: boolean = false;
  data!: Data;
  files: any = {};
  folder: any = 'data';
  folderBoolean: boolean = true;
  selectedFiles?: FileList;
  currentFile?: File;
  progressInfos: any[] = [];
  message: string[] = [];
  link: string | null = '';

  fileInfos?: Observable<any>;

  loaded = false;
  selection = new SelectionModel<Data>(true, []);
  chooseFolder = this.formBuilder.group({
    folder: ''
  });
  selectFiles(event: any) {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }
  getFolder() {
    console.log('select', this.chooseFolder.value.folder)
    /* if (this.chooseFolder.value.folder != '' || this.chooseFolder.value.folder != null) {
       this.folder = this.chooseFolder.value.folder
     } else {*/
    if (this.url == true) {
      this.folder = 'v' + this.folder;
    } else if (this.chooseFolder.value.folder != "") {
      this.folder = this.chooseFolder.value.folder
    } else {
      this.folder = this.link;
    }
    // }


    /* this.uploadService.getFiles(this.folder)*/
    this.folderBoolean = false;
    this.selection.clear();
    this.chargedTableList(this.folder)
    console.log('Folder', this.folder)
  }
  chargedTableList(folder: string) {
    // this.log='';
    console.log('-------------------', folder);
    this.loaded = true;
    this.uploadService.getFiles(folder)
      .subscribe((filesDatas: Data[]) => {
        console.log(filesDatas)
        this.resSource = new MatTableDataSource<Data>(filesDatas);
      });
    this.loaded = false;
  }
  constructor(private location: Location, private router: Router, private route: ActivatedRoute, public sanitizer: DomSanitizer, private formBuilder: FormBuilder, private condaService: CondaService, private uploadService: UploadFilesService, private dataServices: dataService) {
    /* this.uploadService.getFiles(this.folder)
       .subscribe((filesDatas: Data[]) => {
         console.log(filesDatas)
         this.dataSource = new MatTableDataSource<Data>(filesDatas);
       });*/
  }
  ngAfterViewInit() {
    if (this.folder == null) {
      this.resSource.paginator = this.paginator;
      this.resSource.sort = this.sort;
    }


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.resSource.filter = filterValue.trim().toLowerCase();
    if (this.resSource.paginator) {
      this.resSource.paginator.firstPage();
    }

  }
  isAllSelected() {
    let val: any;
    let num: any;
    // if (this.folder == null) {


    num = this.selection.selected.length;
    val = this.resSource.data.length;

    // }
    const numSelected = num
    const numRows = val
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    this.isAllSelected() ?
      this.selection.clear() :
      this.resSource.data.forEach(row => this.selection.select(row));


  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Data): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }
  delete() {
    let tables: any = [];
    this.selection.selected.forEach((data: Data) => {
      tables.push(data)
    })
    console.log(tables.length)
    this.uploadService.deleteFiles(tables, 'resultat')
      .subscribe(
        response => {
          console.log(response);
          this.chargedTableList(this.folder)
          tables.push()
        }, error => {
          console.log(error);
          this.chargedTableList(this.folder)
          tables.push()
        }
      );
    this.selection.clear();
    tables = []
  }

  valide() {
    let tables: any = [];
    this.selection.selected.forEach((data: Data) => {
      tables.push(data)
    })
    console.log('test', tables.length)


    //window.location.reload();



    this.dataServices.add(tables, 'v' + this.folder)
      .subscribe(
        response => {
          console.log(response);
          this.url = true
          this.getFolder()
          this.router.navigate(['/result', { id: this.folder }]);

        }, error => {
          console.log(error);
        }
      );

  }
  download() {
    let tables: any = [];
    this.selection.selected.forEach((data: Data) => {
      tables.push(data)
    })
    console.log(tables.length)
    if (tables.length > 1) {

    } else {

      this.uploadService.downloadFiles(tables)

    }

  }
  ngOnInit(): void {
    this.link = this.route.snapshot.paramMap.get('id')
    console.log('link', this.link)
    if (this.link == null) {
    } else {
      this.getFolder()
    }

    console.log(this.folder)
  }


}
