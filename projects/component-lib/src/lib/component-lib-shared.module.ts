import { NgModule } from '@angular/core';
import { ChkUserIdealStateDirective } from './directives/chk-user-ideal-state.directive';

@NgModule({
  declarations: [ChkUserIdealStateDirective],
  exports: [ChkUserIdealStateDirective],
})
export class ComponentLibSharedModule {}
