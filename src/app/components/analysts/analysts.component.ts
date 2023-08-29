import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Analyst} from "../../model/analyst";
import {AnalystService} from "../../services/analyst.service";
import {MatDialog} from "@angular/material/dialog";
import {AnalystDialogContentComponent} from "../analyst-dialog-content/analyst-dialog-content.component";
import {AnalystModify} from "../../model/analyst-modify";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Company} from "../../model/company";
import {subscribeOn} from "rxjs";
import {CompanyDialogContentComponent} from "../company-dialog-content/company-dialog-content.component";
import {CompanyModify} from "../../model/company-modify";

@Component({
  selector: 'app-analysts',
  templateUrl: './analysts.component.html',
  styleUrls: ['./analysts.component.css']
})

export class AnalystsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['analystName', 'companies', 'buttons'];
  dataSource: MatTableDataSource<Analyst> = new MatTableDataSource<Analyst>([]);

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private analystService: AnalystService, protected dialog: MatDialog) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.loadAnalysts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadAnalysts() {
    this.analystService.getAnalysts().subscribe(analysts => {
      this.dataSource.data = analysts
    });
  }

  onAnalystDeleteClick(id: number) {
    this.analystService.deleteAnalyst(id)
      .subscribe(_ => this.loadAnalysts())
  }

  onAnalystEditClick(analystId: number) {
    this.openDialogForAnalystCreateOrUpdate(analystId);
  }

  onAnalystAddClick() {
    this.openDialogForAnalystCreateOrUpdate(null);
  }

  private openDialogForAnalystCreateOrUpdate(analystId: number | null) {
    const dialogRef = this.dialog.open<AnalystDialogContentComponent, number | null, AnalystModify>(
      AnalystDialogContentComponent, { data: analystId }
    );
    dialogRef.afterClosed().subscribe(analyst => {
      if (analyst) {
        let observable = analyst.id ? this.analystService.updateAnalyst(analyst) : this.analystService.addAnalyst(analyst);
        observable.subscribe(_ => this.loadAnalysts());
      }
    });
  }
}
