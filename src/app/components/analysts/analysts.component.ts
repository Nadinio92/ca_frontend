import {Component} from '@angular/core';
import {Analyst} from "../../model/analyst";
import {AnalystService} from "../../services/analyst.service";
import {CompanyDialogContentComponent} from "../company-dialog-content/company-dialog-content.component";
import {MatDialog} from "@angular/material/dialog";
import {AnalystDialogContentComponent} from "../analyst-dialog-content/analyst-dialog-content.component";



@Component({
  selector: 'app-analysts',
  templateUrl: './analysts.component.html',
  styleUrls: ['./analysts.component.css']
})

export class AnalystsComponent {
  displayedColumns: string[] = ['analystName','marketCap','sector','companies'];
  dataSource: Analyst[] = [];

  constructor(private analystService: AnalystService, protected dialog: MatDialog) {
    this.dataSource = analystService.getAnalysts();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AnalystDialogContentComponent);

    dialogRef.afterClosed().subscribe(analyst => {
      if (analyst) {
        this.analystService.addAnalyst(analyst);
        this.dataSource = [...this.analystService.getAnalysts()];
      }
    });


  }
}

