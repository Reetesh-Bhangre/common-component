import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CtNotificationComponent } from './ct-notification.component';

import { CtNotificationPopupComponent } from './ct-notification-popup/ct-notification-popup.component';
import { CtLoadingSpinnerModule } from './../ct-loading-spinner/ct-loading-spinner.module';
import { CtWidgetLoadingModule } from './../ct-widget-loading/ct-widget-loading.module';
@NgModule({
  declarations: [CtNotificationComponent, CtNotificationPopupComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    CtLoadingSpinnerModule,
    CtWidgetLoadingModule,
  ],
  exports: [CtNotificationComponent, CtLoadingSpinnerModule],
})
export class CtNotificationModule {}
