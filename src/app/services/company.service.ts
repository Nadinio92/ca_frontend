import { Injectable } from '@angular/core';
import {Company} from "../model/company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private data:Company[] = [
    {companyName: 'Deutsche Bank', marketCap: 29000000000, sector: 'IT' , analysts: ['Andrew Win', 'Georgi Bin']},
    {companyName: 'Avito', marketCap: 29000000000, sector: 'IT' , analysts: ['Andrew Win', 'Georgi Bin']},
    {companyName: 'FunBox', marketCap: 29000000000, sector: 'IT' , analysts: ['Andrew Win', 'Georgi Bin']},
    {companyName: 'LAbCorp', marketCap: 29000000000, sector: 'Medicine' , analysts: ['Andrew Win', 'Georgi Bin']},

  ];

  constructor() { }

  public getCompanies():Company[] {
    return this.data;
  }

  public addCompany(c:Company){
    this.data.push(c);
  }



}
