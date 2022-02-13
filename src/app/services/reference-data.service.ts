import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { APIURLS } from '../config/config.const';

@Injectable({
  providedIn: 'root',
})
export class ReferenceDataService {
  constructor(private http: HttpClient) {}

  public getCarsReferenceData(): Observable<string[]> {
    return this.http
      .get<any[]>(APIURLS.CARS_URL)
      .pipe(map((cars: any[]) => cars?.map((car: any) => car.brand)) || []);
  }

  public getAutoPartsReferenceData(): Observable<string[]> {
    return this.http
      .get<any[]>(APIURLS.AUTO_PARTS_URL)
      .pipe(
        map(
          (autoParts: any[]) =>
            autoParts?.map((autoPart: any) => autoPart['List of auto parts']) ||
            []
        )
      );
  }
}
