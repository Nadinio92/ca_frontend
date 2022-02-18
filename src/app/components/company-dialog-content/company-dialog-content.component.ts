import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AnalystService} from "../../services/analyst.service";
import {Analyst} from "../../model/analyst";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Sector} from "../../model/sector";
import {SectorService} from "../../services/sector.service";
import {CompanyModify} from "../../model/company-modify";
import {CompanyService} from "../../services/company.service";
import {forkJoin} from "rxjs";


@Component({
  selector: 'app-company-dialog-content',
  templateUrl: './company-dialog-content.component.html',
  styleUrls: ['./company-dialog-content.component.css']
})

export class CompanyDialogContentComponent implements OnInit {

  companyFormGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    analysts: new FormControl(''),
    marketCap: new FormControl(''),
    sector: new FormControl('')
  });

  private allAnalysts: Analyst[] = [];
  allSectors: Sector[] = [];
  selectedAnalysts: Analyst[] = [];
  availableAnalysts: Analyst[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private companyId: number,
              private companyService: CompanyService,
              private analystService:AnalystService,
              private sectorService:SectorService,
              private changeDetectionRef: ChangeDetectorRef,
              private dialogRef: MatDialogRef<CompanyDialogContentComponent, CompanyModify>) {
  }

  ngOnInit() {
      forkJoin(
        this.analystService.getAnalysts(),
        this.sectorService.getSectors()
      ).subscribe(([analysts, sectors]) => {
        this.allAnalysts = analysts;
        this.availableAnalysts = analysts;
        this.allSectors = sectors;

        if (this.companyId) {
          this.companyService.getCompanyForUpdate(this.companyId).subscribe(
            company => {
              this.companyFormGroup.setValue(company);
              this.selectedAnalysts = company.analysts.map(analystId => {
                let analyst = this.allAnalysts.find(analyst => analyst.id == analystId)
                if (!analyst) throw new Error(`Analyst with id ${analystId} not found`);
                return analyst
              });
              this.refreshAutocomplete();
              this.changeDetectionRef.detectChanges();
            }
          )
        }
      });
  }

  onSave(){
    if (!this.companyFormGroup.valid) return;
    const formData = this.companyFormGroup.getRawValue();
    const companyModify : CompanyModify = {
      id: formData.id,
      name: formData.name,
      sector: formData.sector,
      analysts: this.selectedAnalysts.map(analyst => analyst.id),
      marketCap: formData.marketCap
    };
    this.dialogRef.close(companyModify);
  }

  onAnalystRemove(analystToRemove: Analyst) {
    this.selectedAnalysts = this.selectedAnalysts.filter(analyst => analyst.id != analystToRemove.id);
    this.refreshAutocomplete();
  }

  onAnalystAdd(analyst: Analyst) {
    this.selectedAnalysts = [...this.selectedAnalysts, analyst];
    this.refreshAutocomplete();
  }

  private refreshAutocomplete() {
    this.availableAnalysts = this.allAnalysts.filter(analyst => !this.selectedAnalysts.includes(analyst));
  }
}

