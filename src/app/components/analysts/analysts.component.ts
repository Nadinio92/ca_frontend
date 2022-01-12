import {Component} from '@angular/core';
import {Analyst} from "../../model/analyst";
import {AnalystService} from "../../services/analyst.service";



@Component({
  selector: 'app-analysts',
  templateUrl: './analysts.component.html',
  styleUrls: ['./analysts.component.css']
})

export class AnalystsComponent {
  displayedColumns: string[] = ['analystName', 'companies', 'marketCap','marketCap','sector'];
  dataSource: Analyst[] = [];

  constructor(private AnalystService: AnalystService) {
    this.dataSource = AnalystService.getAnalysts();
  }
}

