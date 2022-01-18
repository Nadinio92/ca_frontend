import { Injectable } from '@angular/core';
import {Analyst} from "../model/analyst";

@Injectable({
  providedIn: 'root'
})
export class AnalystService {

  private data: Analyst[] = [
    {name: 'Georgi', companies:['Med Life','Med Farm'], marketCap: 9800000, sector: 'Health Care'},
    {name: 'Andrew', companies:['FaceBook','Google'], marketCap: 6000000, sector: 'Technology'},
    {name: 'Mike', companies:['TiTulFinance','IQ Credit'], marketCap: 30000000, sector: 'Financials'},
    {name: 'Natasha', companies:['Avito'], marketCap: 11000000, sector: 'Consumer Services'}

  ]

  constructor() { }

  public getAnalysts():Analyst[]{
    return this.data;
  }

  public addAnalyst(a:Analyst){
    this.data.push(a);
  }
}
