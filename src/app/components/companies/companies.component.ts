import {Component, OnDestroy, OnInit} from '@angular/core';
import {Company} from "../../model/company";
import {CompanyService} from "../../services/company.service";
import {MatDialog} from "@angular/material/dialog";
import {CompanyDialogContentComponent} from "../company-dialog-content/company-dialog-content.component";


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['companyName', 'marketCap', 'sector', 'analyst'];
  dataSource: Company[] = [];

  constructor(private companyService: CompanyService, protected dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  ngOnDestroy(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CompanyDialogContentComponent);

    dialogRef.afterClosed().subscribe(company => {
      if (company) {
        this.companyService.addCompany(company)
          .subscribe(_ => this.loadCompanies());
      }
    });
  }

  private loadCompanies() {
    this.companyService.getCompanies().subscribe(companies => {
      this.dataSource = companies
    });
  }
}

