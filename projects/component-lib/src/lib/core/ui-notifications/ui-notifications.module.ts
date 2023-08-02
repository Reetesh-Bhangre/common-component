import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UiNotificationsComponent } from './ui-notifications.component';
import { NotificationService } from '../../services/notification.service';

@NgModule({
  declarations: [UiNotificationsComponent],
  imports: [CommonModule, ToastrModule.forRoot(), MatSnackBarModule],
  exports: [UiNotificationsComponent],
  providers: [NotificationService],
})
export class UiNotificationsModule {}
