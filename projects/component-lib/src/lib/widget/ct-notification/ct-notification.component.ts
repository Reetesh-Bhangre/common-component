import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { notification } from './notification.model';

@Component({
  selector: 'ct-notification',
  templateUrl: './ct-notification.component.html',
  styleUrls: ['./ct-notification.component.scss'],
  host: {
    '(document:click)': 'offClick($event)',
  },
})
export class CtNotificationComponent implements OnInit {
  /** All public variables are listed Here */
  // _notificationCount will show the unread count
  private _notificationCount: number;
  private _notificationMessages;
  private _boardLoadingMask = true;
  private _countLoadingMask = true;

  public notificationPopup = false;
  public trashBtnClick = false;

  /** All Input Properties Listed Here */
  // withDarkTheme to maintain the icon color for visibility
  @Input() withDarkTheme = true;

  // isDropdownActive to enable OR disable the dropdown Click
  @Input() isDropdownActive = true;

  // countLoadingMask to show and hide the loading on UI
  @Input() public get countLoadingMask() {
    return this._countLoadingMask;
  }
  public set countLoadingMask(status) {
    this._countLoadingMask = status;
  }

  // boardLoadingMask to show and hide the loading on UI
  @Input() public get boardLoadingMask() {
    return this._boardLoadingMask;
  }
  public set boardLoadingMask(status) {
    this._boardLoadingMask = status;
  }

  // notificationCount to show the unread count
  @Input() public get notificationCount() {
    return this._notificationCount;
  }
  public set notificationCount(count) {
    this._notificationCount = count;
  }

  // notificationMessages will content the list of messages
  @Input() public get notificationMessages() {
    return this._notificationMessages;
  }
  public set notificationMessages(messages: any[]) {
    this._notificationMessages = messages;
  }

  //
  @Input() topGutter = 0;

  /** All Output Properties Listed Here */
  // Event Emitted on read icon click with message details
  @Output() onMessageRead: EventEmitter<notification> = new EventEmitter();
  // Event Emitted on message board dropdown open
  @Output() openMessageBoard: EventEmitter<notification> = new EventEmitter();
  // Event Emitted on message mark as archive
  @Output() onMessageArchive: EventEmitter<notification> = new EventEmitter();
  // Event Emitted on All message mark as read
  @Output() onMarkAllRead: EventEmitter<unknown> = new EventEmitter();
  // Event Emitted on Show All Notification Click
  @Output() onShowAllNotification: EventEmitter<unknown> = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    // Constructor code Goes Here
  }

  ngOnInit(): void {
    // OnInit code Goes Here
  }

  /** Function to toggle the Notification message Board dropDown */
  toggleNotificationPopup() {
    if (this.isDropdownActive) {
      this.notificationPopup = !this.notificationPopup;
      if (this.notificationPopup) {
        this.openMessageBoard.emit();
      }
    }
  }

  /** Function to Close the Notification message Board dropDown */
  closeNotificationPopup() {
    this.notificationPopup = false;
  }

  /** Function to Close the dropdown If we are clicking the outside of component */
  offClick(event) {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      !this.trashBtnClick &&
      this.notificationPopup
    ) {
      this.closeNotificationPopup();
    }
    this.trashBtnClick = false;
  }

  /** Function to emit the event on read icon click with message details */
  messageReadClick(message) {
    this.onMessageRead.emit(message);
  }

  /** Function to set the message in status as archive */
  messageArchive(message) {
    this.trashBtnClick = true;
    this.onMessageArchive.emit(message);
  }

  /** */
  calculateHeight() {
    return window.innerHeight - this.topGutter + 'px';
  }

  /** */
  markAllAsRead() {
    this.onMarkAllRead.emit();
  }

  showAllNotification() {
      this.onShowAllNotification.emit();
      if (this.notificationPopup) { 
          this.closeNotificationPopup();
      }
  }
}
