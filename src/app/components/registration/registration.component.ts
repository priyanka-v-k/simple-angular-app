import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReferenceDataService } from 'src/app/services/reference-data.service';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public registrationForm!: FormGroup;
  private subscriptions: Subscription;
  public cars: string[];
  public autoParts: string[];
  public faCarSide = faCarSide;

  constructor(
    private formBuilder: FormBuilder,
    private referenceDataService: ReferenceDataService
  ) {
    this.registrationForm = this.formBuilder.group({
      fullName: [null, [Validators.required, this.fullNameValidator]],
      brand: [null, Validators.required],
      autoParts: [[], Validators.required],
      color: ['#000000', Validators.required],
    });
    this.subscriptions = new Subscription();
    this.cars = [];
    this.autoParts = [];
    this.registrationForm.valueChanges.subscribe((value: any) => {
      console.log(value);
    });
  }

  ngOnInit(): void {
    this.populateFormData();
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  private fullNameValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (!control.value) return { required: true };
    if (!/^[a-z A-Z]+$/.test(control.value)) {
      return { invalidName: true };
    }
    return null;
  }

  public populateFormData(): void {
    this.getCarsRefereceData();
    this.getAutoPartsRefereceData();
  }

  private getCarsRefereceData(): void {
    this.subscriptions.add(
      this.referenceDataService.getCarsReferenceData().subscribe({
        next: (cars: string[]) => {
          this.cars = cars;
        },
        error: (e: any) => console.log(e, 'Error loading the cars dropdown!'),
      })
    );
  }

  private getAutoPartsRefereceData(): void {
    this.subscriptions.add(
      this.referenceDataService.getAutoPartsReferenceData().subscribe({
        next: (autoParts: string[]) => {
          this.autoParts = autoParts;
        },
        error: (e: any) =>
          console.log(e, 'Error loading the auto parts dropdown!'),
      })
    );
  }

  public onSubmitHandler(): void {}
}
