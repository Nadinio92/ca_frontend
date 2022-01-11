import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  analystName: string;
  companies: string [];
  marketCap: number;
  sector: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {analystName: 'Georgi Bin', companies:['Med Life','Med Farm'], marketCap: 3000000, sector: 'Medicine'},

];

@Component({
  selector: 'app-analysts',
  templateUrl: './analysts.component.html',
  styleUrls: ['./analysts.component.css']
})

export class TableAnalysts {
  displayedColumns: string[] = ['analystName', 'companies', 'marketCap','marketCap','sector'];
  dataSource = ELEMENT_DATA;
}

