import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { CtGridComponent } from '../../common-components/ct-grid/ct-grid.component';
import { NotificationConstant } from './notification-dashboard.constant';
import { CtNotificationDialogComponent } from './ct-notification-dialog/ct-notification-dialog.component';

@Component({
  selector: 'ct-notification-dashboard',
  templateUrl: './ct-notification-dashboard.component.html',
  styleUrls: ['./ct-notification-dashboard.component.scss'],
})
export class CtNotificationDashboardComponent implements OnInit {
  private _notificationList!: any;
  private _nonArchiveColDef!: any;

  @Input() get notificationList() {
    return this._notificationList;
  }
  set notificationList(value) {
    this._notificationList = value;
  }

  @Input() get nonArchiveColDef() {
    return this._nonArchiveColDef;
  }
  set nonArchiveColDef(value) {
    this._nonArchiveColDef = value;
  }

  @ViewChild('activeNotificationGrid')
  activeNotificationGrid!: CtGridComponent;

  public fitToWindow = true;
  public gridHeight = '150px';
  public paginationPageSize = 20;
  public rowModelType = 'Client-Side';
  public rowMultiSelectWithClick = true;
  public gridDefaultColDef = NotificationConstant.gridDefaultColumnDefinition;
  public gridData = [];
  public gridColumn: any = this.nonArchiveColDef;

  constructor(public messageDetails: MatDialog) {
    console.log('Notification Dashboard Constructor');
  }

  ngOnInit(): void {
    console.log('Notification Dashboard Constructor');
  }

  deleteRowClick(event) {
    console.log('Row Delete Button Click', event);
  }

  onRowClick(event) {
    console.log('Row Clicked Event with Data', event);
    this.openMessageDialog(event);
  }

  openMessageDialog(event): void {
    console.log('Dialog event', event);
    const dialogRef = this.messageDetails.open(CtNotificationDialogComponent, {
      data: {
        title: event?.data?.subject,
        description: event?.data?.message,
        date: event?.data?.lastModifiedTs,
        severity: event?.data?.severity,
        source: event?.data?.source,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
