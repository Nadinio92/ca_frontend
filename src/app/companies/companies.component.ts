import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  companyName: string;
  marketCap: number;
  sector: string;
  analyst: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {companyName: 'Deutsche Bank', marketCap: 29000000000, sector: 'IT' , analyst: 'Andrew Win'},

];

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class TableCompany {
  displayedColumns: string[] = ['companyName', 'marketCap', 'sector', 'analyst'];
  dataSource = ELEMENT_DATA;
}


// export class CompaniesComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit(): void {
//   }
//
//   onAddCompany() {
//     alert("Add company clicked.")
//   }
// }
