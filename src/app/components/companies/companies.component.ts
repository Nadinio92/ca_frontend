import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Company} from "../../model/company";
import {CompanyService} from "../../services/company.service";
import {MatDialog} from "@angular/material/dialog";
import {CompanyDialogContentComponent} from "../company-dialog-content/company-dialog-content.component";
import {CompanyModify} from "../../model/company-modify";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['companyName', 'marketCap', 'sector', 'analyst', 'buttons'];
  dataSource: MatTableDataSource<Company> = new MatTableDataSource<Company>([]);

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private companyService: CompanyService, protected dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
  }

  private loadCompanies() {
    this.companyService.getCompanies().subscribe(companies => {
      this.dataSource.data = companies;
    });
  }

  onCompanyDeleteClick(id: number ) {
    this.companyService.deleteCompany(id)
      .subscribe( _ => this.loadCompanies());
  }

  onAddCompanyClick() {
    this.openDialogForCompanyCreateOrUpdate(null);
  }

  onCompanyEditClick(companyId : number) {
    this.openDialogForCompanyCreateOrUpdate(companyId);
  }

  private openDialogForCompanyCreateOrUpdate(companyId: number | null) {
    const dialogRef = this.dialog.open<CompanyDialogContentComponent, number | null, CompanyModify>(
      CompanyDialogContentComponent,
      {
        data: companyId
      }
    );

    dialogRef.afterClosed().subscribe(company => {
      if (company) {
        let observable = company.id ? this.companyService.updateCompany(company) : this.companyService.addCompany(company);
        observable.subscribe(_ => this.loadCompanies());
      }
    });

  }

}

