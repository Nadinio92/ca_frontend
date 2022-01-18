import {Component} from '@angular/core';
import {Company} from "../../model/company";
import {CompanyService} from "../../services/company.service";
import {MatDialog} from "@angular/material/dialog";
import {CompanyDialogContentComponent} from "../company-dialog-content/company-dialog-content.component";


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
  displayedColumns: string[] = ['companyName', 'marketCap', 'sector', 'analyst'];
  dataSource: Company[] = [];


  constructor(private companyService: CompanyService, protected dialog: MatDialog) {
    this.dataSource = companyService.getCompanies();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CompanyDialogContentComponent);

    dialogRef.afterClosed().subscribe(company => {
      if (company) {
        this.companyService.addCompany(company);
        this.dataSource = [...this.companyService.getCompanies()];
      }
    });

  }
}

