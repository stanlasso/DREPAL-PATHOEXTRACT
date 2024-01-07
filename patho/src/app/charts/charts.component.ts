import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CondaService } from '../_services/conda.service';
import { UploadFilesService } from '../_services/upload_file.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  baseUrl = `${environment.apiUrl}/data`;

  dataSource_: any;
  columnsToDisplay = ['name', 'read'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: ChartsElement | null;

  displayedColumns: string[] = ['name', 'read', 'pr', 'type'];
  dataSource: any
  controlButton: boolean = false;
  options: any;
  showlog: boolean = false;
  files: any = [];
  files2: any = [];
  num_seq: any = [];
  sum_lens: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  constructor(private router: Router, private uploadFilesService: UploadFilesService, private condaService: CondaService, private _snackBar: MatSnackBar) { }
  openSnackBar(message: any, min: any) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * min,
    });
  }
  linkdwn() {
    this.openSnackBar('Downloading.........', 100)
  }
  ngOnInit(): void {
    this.showlog = true
    this.runseqkit()
  }
  reRun() {
    this.showlog = true
    this.runseqkit()
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  runseqkit() {
    this.files = []
    this.files2 = []
    this.num_seq = []
    this.sum_lens = []
    this.controlButton = true;
    this.condaService.stat()
      .subscribe(
        response => {
          this.showlog = false
          /* if (response == 'OK') {
            this.openSnackBar("Fastq finished, download log file", 100)
          } else {
            this.openSnackBar("Delete All Files Before to Run", 100)
          } */
          console.log(response)
          this.dataSource = response
          this.dataSource_ = response
          //     ChartsElement[]= response
        }, error => {
          this.showlog = false
          console.log(error);
          if (error.error.text == "OK") {
            this.openSnackBar("Fastq finished, download log file", 100)
          } else {
            this.openSnackBar("Error Call Administrator", 100)
          }
        }
      );
  }
  graph(n: String, read: Number, hm: Number, pm: Number, pu: Number) {
    var data = [n, read, hm, pm, pu]
    console.log(data[0])
    this.uploadFilesService.downloadGraph(data).subscribe(data => {
      let downloadURL = window.URL.createObjectURL(data);
     // saveAs(downloadURL);
    })
  }
}
export interface ChartsElement {
  name: string;
  read: number;
  pr: number;
  type: string;
}


