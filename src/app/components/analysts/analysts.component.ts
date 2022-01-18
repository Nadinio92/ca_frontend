import {Component} from '@angular/core';
import {Analyst} from "../../model/analyst";
import {AnalystService} from "../../services/analyst.service";
import {CompanyDialogContentComponent} from "../company-dialog-content/company-dialog-content.component";
import {MatDialog} from "@angular/material/dialog";



@Component({
  selector: 'app-analysts',
  templateUrl: './analysts.component.html',
  styleUrls: ['./analysts.component.css']
})

export class AnalystsComponent {
  displayedColumns: string[] = ['analystName','companies','marketCap','sector'];
  dataSource: Analyst[] = [];

  constructor(private AnalystService: AnalystService, protected dialog: MatDialog) {
    this.dataSource = AnalystService.getAnalysts();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CompanyDialogContentComponent);


  }
}

