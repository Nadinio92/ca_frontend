import { Injectable } from '@angular/core';
import {Company} from "../model/company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private data:Company[] = [
    {name: 'Deutsche Bank', marketCap: 70000000000, sector: 'IT' , analysts: ['Tomas', 'Georgi']},
    {name: 'Avito', marketCap: 800000000, sector: 'Consumer Services,' , analysts: ['Dillon', 'Natasha']},
    {name: 'TiTulFinance', marketCap: 71000000000, sector: 'Financial' , analysts: ['Andrew', 'Mike']},
    {name: 'LAbCorp', marketCap: 11000000000, sector: 'Health Care' , analysts: ['Mark', 'Georgi']},

  ];

  constructor() { }

  public getCompanies():Company[] {
    return this.data;
  }

  public addCompany(c:Company){
    this.data.push(c);
  }



}
