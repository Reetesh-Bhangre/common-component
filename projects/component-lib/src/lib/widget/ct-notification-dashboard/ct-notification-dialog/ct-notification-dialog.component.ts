import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ct-notification-dialog',
  templateUrl: './ct-notification-dialog.component.html',
  styleUrls: ['./ct-notification-dialog.component.scss'],
})
export class CtNotificationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CtNotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public messageDetails: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
