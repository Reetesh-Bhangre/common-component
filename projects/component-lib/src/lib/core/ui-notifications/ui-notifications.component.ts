import { Component, Input, OnInit } from '@angular/core';

import { NotificationService } from '../../services/notification.service';
import { uiNotificationConfig, toastrMessage } from './toastr.interface';

@Component({
  selector: 'ui-notifications',
  templateUrl: './ui-notifications.component.html',
})
export class UiNotificationsComponent implements OnInit {
  /**
   * @variable : Input variable, seek for base configuration on notification module load.
   * If not provided, it will set default one
   */
  @Input() uiNotificationConfig: uiNotificationConfig = {
    timeOut: 5000,
    progressBar: true,
    preventDuplicates: false,
    notificationType: 'snackbar',
  };

  constructor(private uiNotificationService: NotificationService) {}

  ngOnInit(): void {
    // On application load it sets the default configuration
    this.uiNotificationService.setToasterConfig(this.uiNotificationConfig);
  }

  // Use to show success message
  public showSuccess(msg: any, partialConfig?: any): void {
    this.uiNotificationService.showSuccess(msg, partialConfig);
  }

  // Use to show information
  public showInfo(msg: any): void {
    this.uiNotificationService.showInfo(msg);
  }

  // Use to show warning
  public showWarning(msg: any): void {
    this.uiNotificationService.showWarning(msg);
  }

  // Use to show error messages
  public showError(msg: any, partialConfig?: any): void {
    this.uiNotificationService.showError(msg, partialConfig);
  }
}
