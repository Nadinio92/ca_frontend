import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AnalystService} from "../../services/analyst.service";
import {Analyst} from "../../model/analyst";
import {MatDialogRef} from "@angular/material/dialog";
import {Company} from "../../model/company";


@Component({
  selector: 'app-company-dialog-content',
  templateUrl: './company-dialog-content.component.html',
  styleUrls: ['./company-dialog-content.component.css']
})

export class CompanyDialogContentComponent implements OnInit {

  companyFormGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    analysts: new FormControl(''),
    marketCap: new FormControl(''),
    sector: new FormControl('')
  });

  listAnalysts: Analyst[] = [];

  constructor(private analystService:AnalystService,
              private dialogRef: MatDialogRef<CompanyDialogContentComponent>) {}

  ngOnInit() {
    this.analystService.getAnalysts().subscribe(analysts => {
      this.listAnalysts = analysts
    });
  }

  onSave(){
    const dialogResult = this.companyFormGroup.getRawValue();
     this.dialogRef.close(<Company>{
       name: dialogResult.name,
       sector: dialogResult.sector,
       analysts: [dialogResult.analysts],
       marketCap: dialogResult.marketCap
     });
  }
}

