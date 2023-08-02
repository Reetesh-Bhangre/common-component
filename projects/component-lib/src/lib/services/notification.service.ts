import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import {
  uiNotificationConfig,
  toastrMessage,
} from '../core/ui-notifications/toastr.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  /**
   * @notificationType : is the type of notification required
   * Options: snackbar/toastr
   * default: snackbar
   */
  public notificationType = 'snackbar';
  public timeOut: 5000;
  public progressBar: true;
  public preventDuplicates: false;

  constructor(public snackBar: MatSnackBar, public toastr: ToastrService) {}

  /**
   * Function to set base configuration for the notifications
   * @param uiNotificationConfig is the base configuration required. This param is optional. If not provided, it set default params
   */
  setToasterConfig(uiNotificationConfig: uiNotificationConfig) {
    this.toastr.toastrConfig.timeOut = uiNotificationConfig.timeOut
      ? uiNotificationConfig.timeOut
      : this.timeOut;
    this.toastr.toastrConfig.progressBar = uiNotificationConfig.progressBar
      ? uiNotificationConfig.progressBar
      : this.progressBar;
    this.toastr.toastrConfig.preventDuplicates =
      uiNotificationConfig.preventDuplicates
        ? uiNotificationConfig.preventDuplicates
        : this.preventDuplicates;
    this.notificationType = uiNotificationConfig.notificationType
      ? uiNotificationConfig.notificationType
      : this.notificationType;
  }

  showSuccess(msg: any, partialConfig?: any): void {
    if (this.notificationType === 'snackbar') {
      this.snackBar.open(msg);
    } else {
      if(partialConfig){
        this.toastr.success(msg.message, msg.title, partialConfig);
      } else {
        this.toastr.success(msg.message, msg.title);
      }
    }
  }

  showError(msg: any, config?: any): void {
    // The second parameter is the text in the button.
    // In the third, we send in the css class for the snack bar.
    if (this.notificationType === 'snackbar') {
      this.snackBar.open(msg, 'X', config);
    } else {
      if (config) {
        this.toastr.error(msg.message, msg.title, config);
      } else {
        this.toastr.error(msg.message, msg.title);
      }
    }
  }

  showInfo(msg: any) {
    if (this.notificationType !== 'snackbar') {
      this.toastr.info(msg.message, msg.title);
    }
  }

  showWarning(msg: toastrMessage) {
    if (this.notificationType !== 'snackbar') {
      this.toastr.warning(msg.message, msg.title);
    }
  }
}
