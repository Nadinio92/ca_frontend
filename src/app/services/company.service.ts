import { Injectable } from '@angular/core';
import {Company} from "../model/company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  public getCompanies():Company[] {
    return [
      {companyName: 'Deutsche Bank', marketCap: 29000000000, sector: 'IT' , analysts: ['Andrew Win', 'Georgi Bin']},
    ];
  }



}
