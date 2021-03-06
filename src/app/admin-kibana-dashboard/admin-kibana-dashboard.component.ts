import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-kibana-dashboard',
  templateUrl: './admin-kibana-dashboard.component.html',
  styleUrls: ['./admin-kibana-dashboard.component.scss']
})
export class AdminKibanaDashboardComponent implements OnInit {

  private subscription: Subscription;
  private timer: Observable<any>;
  showLoader = true;

  constructor() {
  }

  ngOnInit() {
    (async () => {
      document.getElementById('dashboard').style.display = 'none';

      await this.delay(1500);

      document.getElementById('dashboard').style.display = 'block';
      this.showLoader = false;
    })();
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
