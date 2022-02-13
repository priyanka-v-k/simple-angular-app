import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public formSubmitted: boolean;
  private subscriptions: Subscription;

  constructor(private sharedService: SharedService) {
    this.formSubmitted = false;
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.getFormSubmitted();
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  private getFormSubmitted(): void {
    this.sharedService.getFormSubmitted().subscribe({
      next: (flag: boolean) => (this.formSubmitted = flag),
    });
  }
}
