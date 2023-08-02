import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[chkUserIdealState]',
})
export class ChkUserIdealStateDirective {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = undefined;
  idleCountdown: number;

  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() idleTime: number = 5;
  @Input() idleTimeOutTime: number = 15;
  @Input() keepAliveInterval: number = 15;

  @Output() onIdleEnd = new EventEmitter<string>();
  @Output() onIdleTimeout = new EventEmitter<string>();
  @Output() onIdleStart = new EventEmitter<string>();
  @Output() onIdleTimeoutWarning = new EventEmitter<any>();

  constructor(
    private renderer: Renderer2,
    private elmRef: ElementRef,
    private idle: Idle,
    private keepalive: Keepalive
  ) {}

  ngOnInit() {
    // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(this.idleTime);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(this.idleTimeOutTime);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.idleState = 'no-longer-idle';
      this.onIdleEnd.emit(this.idleState);
      this.reset();
    });

    this.idle.onTimeout.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // this.childModal.hide();
      this.idleState = 'itle-time-out';
      this.timedOut = true;
      this.onIdleTimeout.emit(this.idleState);
      // this.router.navigate(["/"]);
    });

    this.idle.onIdleStart.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.idleState = 'idle-time-start';
      this.onIdleStart.emit(this.idleState);
      // this.childModal.show();
    });

    this.idle.onTimeoutWarning
      .pipe(takeUntil(this.destroy$))
      .subscribe(countdown => {
        this.idleState = 'idle-countdown';
        this.idleCountdown = countdown;
        this.onIdleTimeoutWarning.emit([this.idleState, this.idleCountdown]);
      });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(this.keepAliveInterval);

    this.keepalive.onPing
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => (this.lastPing = new Date()));

    this.idle.watch();
    this.timedOut = false;
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void {
    // this.childModal.hide();
  }

  stay() {
    // this.childModal.hide();
    this.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
