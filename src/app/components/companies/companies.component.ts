import {Component} from '@angular/core';
import {Company} from "../../model/company";
import {CompanyService} from "../../services/company.service";


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
  displayedColumns: string[] = ['companyName', 'marketCap', 'sector', 'analyst'];
  dataSource: Company[] = [];


  constructor(private companyService : CompanyService) {
    this.dataSource = companyService.getCompanies();
  }
}

