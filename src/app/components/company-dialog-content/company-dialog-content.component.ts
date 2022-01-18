import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CompanyService} from "../../services/company.service";
import {AnalystService} from "../../services/analyst.service";
import {Company} from "../../model/company";
import {Analyst} from "../../model/analyst";
import {MatDialogRef} from "@angular/material/dialog";


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
    this.listAnalysts = this.analystService.getAnalysts();
  }

  onSave(){
     this.dialogRef.close(this.companyFormGroup.getRawValue());
  }
}

