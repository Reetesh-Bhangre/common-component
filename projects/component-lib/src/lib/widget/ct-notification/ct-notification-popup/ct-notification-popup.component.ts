import { Component, EventEmitter, Input, Output } from '@angular/core';
import { notification } from './../notification.model';

@Component({
  selector: 'ct-notification-popup',
  templateUrl: './ct-notification-popup.component.html',
  styleUrls: ['./ct-notification-popup.component.scss'],
})
export class CtNotificationPopupComponent {
  private _boardLoadingMask = true;
  private _notificationMessages;
  private _notificationCount;

  public activeMessageDetails: notification;
  public activeMessageId = '';

  // boardLoadingMask to show and hide the loading on UI
  @Input() public get boardLoadingMask() {
    return this._boardLoadingMask;
  }
  public set boardLoadingMask(status) {
    this._boardLoadingMask = status;
  }

  // notificationMessages will content the list of messages
  @Input() public get notificationMessages() {
    return this._notificationMessages;
  }
  public set notificationMessages(messages: any[]) {
    this._notificationMessages = messages;
  }

  // notificationMessages will content the list of messages
  @Input() public get notificationCount() {
    return this._notificationCount;
  }
  public set notificationCount(count) {
    this._notificationCount = count;
  }

  // topGutter help to create space from top
  @Input() topGutter = 0;

  /** All Output Properties Listed Here */
  // Event Emitted on message click with message details
  @Output() messageRead = new EventEmitter<notification>();
  // Event Emitted on trash Icon click
  @Output() messageArchive: EventEmitter<unknown> = new EventEmitter();
  // Event Emitted on close icon click to close the message-list popup
  @Output() closeMessageListPopup: EventEmitter<unknown> = new EventEmitter();
  // Event Emitted on mark All click
  @Output() markAllRead: EventEmitter<unknown> = new EventEmitter();
  // Event Emitted on View All Notification click
  @Output() viewAllNotification: EventEmitter<unknown> = new EventEmitter();

  onMessageClick(data: notification) {
    this.messageRead.emit(JSON.parse(JSON.stringify(data)));
    this.activeMessageDetails = JSON.parse(JSON.stringify(data));
    this.activeMessageId = data.id;
  }

  onCloseClick() {
    this.closeMessageListPopup.emit();
  }

  closeOpenedMessage() {
    this.activeMessageId = '';
  }

  archive(data: notification) {
    this.messageArchive.emit(data);
  }

  markAllAsRead() {
    this.markAllRead.emit();
  }

  showAllNotification() {
    this.viewAllNotification.emit();
  }
}
