import { Injectable } from '@angular/core';
import {Analyst} from "../model/analyst";

@Injectable({
  providedIn: 'root'
})
export class AnalystService {

  constructor() { }

  public getAnalysts():Analyst[]{

    return [
      {name: 'Georgi', companies:['Med Life','Med Farm'], marketCap: 3000000, sector: 'Medicine'},
      {name: 'Andrew', companies:['FaceBook','Google'], marketCap: 6000000, sector: 'IT'},
      {name: 'Mike', companies:['TiTulFinance','IQ Credit'], marketCap: 30000000, sector: 'Financial'}
    ];
  }

}
