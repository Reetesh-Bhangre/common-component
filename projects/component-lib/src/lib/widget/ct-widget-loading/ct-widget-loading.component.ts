import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ct-widget-loading',
  templateUrl: './ct-widget-loading.component.html',
  styleUrls: ['./ct-widget-loading.component.scss'],
})
export class CtWidgetLoadingComponent implements OnInit {
  public _loadingMessages: string;
  public _withDarkTheme: boolean;

  // LoadingText will content the loading messages
  @Input() public get loadingMessage() {
    return this._loadingMessages;
  }
  public set loadingMessage(messages: string) {
    this._loadingMessages = messages;
  }

  // withDarkTheme will set the color to visible icon
  @Input() public get withDarkTheme() {
    return this._withDarkTheme;
  }
  public set withDarkTheme(darkTheme: boolean) {
    this._withDarkTheme = darkTheme;
  }

  constructor() {
    // constructor Code
  }

  ngOnInit(): void {
    // ngOnInit Code
  }
}
