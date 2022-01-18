import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Company} from "../../model/company";
import {CompanyService} from "../../services/company.service";
import {MatDialogRef} from "@angular/material/dialog";

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
    this.listCompanies = this.companyService.getCompanies();
  }

    onSave(){
      this.dialogRef.close(this.analystFormGroup.getRawValue());
    }

}
