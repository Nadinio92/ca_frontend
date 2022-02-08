import {Component, OnDestroy, OnInit} from '@angular/core';
import {Analyst} from "../../model/analyst";
import {AnalystService} from "../../services/analyst.service";
import {MatDialog} from "@angular/material/dialog";
import {AnalystDialogContentComponent} from "../analyst-dialog-content/analyst-dialog-content.component";

@Component({
  selector: 'app-analysts',
  templateUrl: './analysts.component.html',
  styleUrls: ['./analysts.component.css']
})

export class AnalystsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['analystName','companies'];
  dataSource: Analyst[] = [];

  constructor(private analystService: AnalystService, protected dialog: MatDialog) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.loadAnalysts();
    }

  onAddAnalyst() {
    const dialogRef = this.dialog.open<AnalystDialogContentComponent, null, Analyst>(AnalystDialogContentComponent);

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

