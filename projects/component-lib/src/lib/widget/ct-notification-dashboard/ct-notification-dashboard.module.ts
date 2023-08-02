import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { CtNotificationDashboardComponent } from './ct-notification-dashboard.component';
import { CtGridModule } from './../../common-components/ct-grid/ct-grid.module';
import { CtNotificationDialogComponent } from './ct-notification-dialog/ct-notification-dialog.component';

@NgModule({
  declarations: [
    CtNotificationDashboardComponent,
    CtNotificationDialogComponent,
  ],
  imports: [CommonModule, MatTabsModule, CtGridModule, MatDialogModule],
  exports: [CtNotificationDashboardComponent, CtNotificationDialogComponent],
})
export class CtNotificationDashboardModule {}
