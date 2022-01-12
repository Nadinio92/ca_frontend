import { Injectable } from '@angular/core';
import {Analyst} from "../model/analyst";

@Injectable({
  providedIn: 'root'
})
export class AnalystService {

  constructor() { }

  public getAnalysts():Analyst[]{

    return [
      {analystName: 'Georgi Bin', companies:['Med Life','Med Farm'], marketCap: 3000000, sector: 'Medicine'},
    ];
  }

}
