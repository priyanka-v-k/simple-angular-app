import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private formSubmitted: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private formData: Subject<any> = new BehaviorSubject<any>({});
  constructor() {}

  public getFormSubmitted(): Observable<boolean> {
    return this.formSubmitted.asObservable();
  }

  public setFormSubmitted(flag: boolean): void {
    this.formSubmitted.next(flag);
  }

  public getFormData(): Observable<any> {
    return this.formData.asObservable();
  }

  public setFormData(value: any): void {
    this.formData.next(value);
  }
}
