import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ctComponentInsertion]',
})
export class InsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
