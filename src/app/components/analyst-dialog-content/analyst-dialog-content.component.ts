import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Company} from "../../model/company";
import {CompanyService} from "../../services/company.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Analyst} from "../../model/analyst";
import {SectorService} from "../../services/sector.service";
import {Sector} from "../../model/sector";
import {AnalystModify} from "../../model/analyst-modify";
import {AnalystService} from "../../services/analyst.service";
import {CompanyModify} from "../../model/company-modify";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-analyst-dialog-content',
  templateUrl: './analyst-dialog-content.component.html',
  styleUrls: ['./analyst-dialog-content.component.css']
})
export class AnalystDialogContentComponent implements OnInit {

  analystFormGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    companies: new FormControl(''),
  });


  private allCompanies: Company[] = [];
  selectedCompanies: Company[] = [];
  availableCompanies: Company[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) private analystId: number | null,
              private companyService: CompanyService,
              private analystService:AnalystService,
              private changeDetectionRef: ChangeDetectorRef,
              private dialogRef: MatDialogRef<AnalystDialogContentComponent, AnalystModify>) {
  }

  ngOnInit() {

      this.companyService.getCompanies()
      .subscribe((companies) => {
      this.allCompanies = companies;
      this.availableCompanies = companies;

      if (this.analystId) {
        this.analystService.getAnalystForUpdate(this.analystId).subscribe(
          analyst => {
            this.analystFormGroup.setValue(analyst);
            this.selectedCompanies = analyst.companies.map(companyId => {
              let company = this.allCompanies.find(company => company.id == companyId)
              if (!company) throw new Error(`Company with id ${companyId} not found`);
              return company
            });
            this.refreshAutocomplete();
            this.changeDetectionRef.detectChanges();
          }
        )
      }
    });
  }

  onCompanyRemove(companyToRemove: Company) {
    this.selectedCompanies = this.selectedCompanies.filter(company => company.id != companyToRemove.id);
    this.refreshAutocomplete();
  }

  onCompanyAdd(company: Company) {
    this.selectedCompanies = [...this.selectedCompanies, company];
    this.refreshAutocomplete();
  }

  private refreshAutocomplete() {
    this.availableCompanies = this.allCompanies.filter(company => !this.selectedCompanies.includes(company));
  }


  onSave(){
    if (!this.analystFormGroup.valid) return;
    const formData = this.analystFormGroup.getRawValue();
    const analystModify : AnalystModify = {
      id: formData.id,
      name: formData.name,
      companies: this.selectedCompanies.map(company=> company.id),
    };
    this.dialogRef.close(analystModify);
  }
}
