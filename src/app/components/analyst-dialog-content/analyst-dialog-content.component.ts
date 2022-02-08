import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Company} from "../../model/company";
import {CompanyService} from "../../services/company.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Analyst} from "../../model/analyst";
import {SectorService} from "../../services/sector.service";
import {Sector} from "../../model/sector";

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


    ///////////////

    var myObj = {
      name: 'Sergey',
      age: 15,
      marketCap : {
        name: 'Market Cap Name',
        finance: 99.9
      }
    };


  }

  onSave() {
      const dialogResult = this.analystFormGroup.getRawValue();
      let analyst : Analyst =  {
        name: dialogResult.name,
        companies: [dialogResult.companies]
      };
      this.dialogRef.close(analyst);
  }
}
