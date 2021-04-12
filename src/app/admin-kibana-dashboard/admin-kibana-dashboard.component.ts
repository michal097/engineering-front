import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ReportsComponent} from './reports/reports.component';

@Component({
  selector: 'app-admin-kibana-dashboard',
  templateUrl: './admin-kibana-dashboard.component.html',
  styleUrls: ['./admin-kibana-dashboard.component.scss']
})
export class AdminKibanaDashboardComponent implements OnInit {

  private subscription: Subscription;
  private timer: Observable<any>;
  showLoader = true;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    (async () => {
      document.getElementById('dashboard').style.display = 'none';
      document.getElementById('report').style.display = 'none';

      await this.delay(1500);

      document.getElementById('dashboard').style.display = 'block';
      document.getElementById('report').style.display = 'block';
      this.showLoader = false;
    })();
  }

  public delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReportsComponent, {
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
