import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Analyst} from "../../model/analyst";
import {AnalystService} from "../../services/analyst.service";
import {MatDialog} from "@angular/material/dialog";
import {AnalystDialogContentComponent} from "../analyst-dialog-content/analyst-dialog-content.component";
import {AnalystModify} from "../../model/analyst-modify";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-analysts',
  templateUrl: './analysts.component.html',
  styleUrls: ['./analysts.component.css']
})

export class AnalystsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['analystName','companies'];
  dataSource: Analyst[] = [];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private analystService: AnalystService, protected dialog: MatDialog) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.loadAnalysts();
    }


  onAddAnalyst() {
    const dialogRef = this.dialog.open<AnalystDialogContentComponent, null, AnalystModify>(AnalystDialogContentComponent);

    dialogRef.afterClosed().subscribe(analyst => {
      if (analyst) {
        this.analystService.addAnalyst(analyst)
        .subscribe(_ => this.loadAnalysts());
      }
    });
  }

  private loadAnalysts(){
    this.analystService.getAnalysts().subscribe(analysts => {
      this.dataSource = analysts
      });
  }

}

