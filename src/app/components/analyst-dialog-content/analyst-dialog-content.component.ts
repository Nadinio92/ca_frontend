import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Company} from "../../model/company";
import {CompanyService} from "../../services/company.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Analyst} from "../../model/analyst";
import {SectorService} from "../../services/sector.service";
import {Sector} from "../../model/sector";
import {AnalystModify} from "../../model/analyst-modify";

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
  listSectors: Sector[] = [];

  constructor(private companyService: CompanyService,
              private sectorService: SectorService,
              private dialogRef: MatDialogRef<AnalystDialogContentComponent>) {}

  ngOnInit() {
    this.companyService.getCompanies().subscribe(companies=>{
      this.listCompanies = companies;
    })
    this.sectorService.getSectors().subscribe(sectors=> {
      this.listSectors = sectors;
    })
  }

  onSave() {
      const dialogResult = this.analystFormGroup.getRawValue();
      let analyst : AnalystModify =  {
        name: dialogResult.name,
        companies: [dialogResult.companies]
      };
      this.dialogRef.close(analyst);
  }
}
