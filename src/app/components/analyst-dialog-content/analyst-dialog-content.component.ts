import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Company} from "../../model/company";
import {CompanyService} from "../../services/company.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Analyst} from "../../model/analyst";

@Component({
  selector: 'app-analyst-dialog-content',
  templateUrl: './analyst-dialog-content.component.html',
  styleUrls: ['./analyst-dialog-content.component.css']
})
export class AnalystDialogContentComponent implements OnInit {

  analystFormGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    companies: new FormControl(''),
    marketCap: new FormControl(''),
    sector: new FormControl('')
  });

  listCompanies: Company[] = [];

  constructor(private companyService:CompanyService,
              private dialogRef: MatDialogRef<AnalystDialogContentComponent>) {}

  ngOnInit() {
    this.companyService.getCompanies().subscribe(companies=>{
      this.listCompanies = companies;
    })


  }
    onSave(){
      const dialogResult = this.analystFormGroup.getRawValue();
      this.dialogRef.close(<Analyst>{
        name: dialogResult.name,
        sector: dialogResult.sector,
        companies: [dialogResult.companies],
        marketCap: dialogResult.marketCap
      })
    }

}
