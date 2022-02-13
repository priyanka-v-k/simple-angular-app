import { Component, OnInit } from '@angular/core';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  public faCarSide = faCarSide;
  public formData: string;
  constructor(private sharedService: SharedService) {
    this.formData = '';
  }

  ngOnInit(): void {
    this.sharedService
      .getFormData()
      .pipe(take(1))
      .subscribe({
        next: (formData: any) => {
          this.formData = '';
          let i = 0;
          Object.values(formData).forEach((value: any) => {
            this.formData += `${value.join ? value.join() : value.toString()}${
              i === Object.values(formData).length - 1 ? '.' : ', '
            }`;
            i++;
          });
        },
      });
  }

  public navigateToForm(): void {
    this.sharedService.setFormSubmitted(false);
    this.sharedService.setFormData({});
  }
}
