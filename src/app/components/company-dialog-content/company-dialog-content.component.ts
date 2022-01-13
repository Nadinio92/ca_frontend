import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CompanyService} from "../../services/company.service";
import {AnalystService} from "../../services/analyst.service";
import {Company} from "../../model/company";
import {Analyst} from "../../model/analyst";


@Component({
  selector: 'app-company-dialog-content',
  templateUrl: './company-dialog-content.component.html',
  styleUrls: ['./company-dialog-content.component.css']
})

export class CompanyDialogContentComponent implements OnInit{

  companyFormGroup: FormGroup = new FormGroup({
    analysts: new FormControl(''),
    companyName: new FormControl(''),
    marketCap: new FormControl(''),
    sector: new FormControl('')
  });


  listAnalysts: Analyst[] = [];

  constructor(private analystService:AnalystService) {
    this.listAnalysts = analystService.getAnalysts();


  }

  ngOnInit() {


  }







}

