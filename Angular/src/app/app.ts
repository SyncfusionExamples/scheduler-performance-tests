import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { PerformanceComponent } from './schedule-samples/performance/performance.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TabModule, PerformanceComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Tab switching animation disabled, same as the React sample.
  public readonly animation = {
    previous: { effect: 'None', duration: 0, easing: '' },
    next: { effect: 'None', duration: 0, easing: '' },
  };
}
