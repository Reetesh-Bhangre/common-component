import { NgModule } from '@angular/core';

import { CtGooglePieChartModule } from './chart-visuals/ct-google-pie-chart/ct-google-pie-chart.module';
import { CtGoogleBarChartModule } from './chart-visuals/ct-google-bar-chart/ct-google-bar-chart.module';
import { CtGoogleTimeLineModule } from './chart-visuals/ct-google-time-line/ct-google-time-line.module';
import { CtGoogleLineChartModule } from './chart-visuals/ct-google-line-chart/ct-google-line-chart.module';

import { CtDatePickerModule } from './common-components/ct-date-picker/ct-date-picker.module';
import { CtSelectModule } from './common-components/ct-select/ct-select.module';
import { CtRangeSelectModule } from './common-components/ct-range-select/ct-range-select.module';
import { CtInputModule } from './common-components/ct-input/ct-input.module';
import { CtToggleModule } from './common-components/ct-toggle/ct-toggle.module';
import { CtPhoneModule } from './common-components/ct-phone/ct-phone.module';

import { CtReactiveFormModule } from './common-components/ct-reactive-form/ct-reactive-form.module';

import { CtGridModule } from './common-components/ct-grid/ct-grid.module';
import { CtCheckboxModule } from './common-components/ct-checkbox/ct-checkbox.module';
import { CtTimepickerModule } from './common-components/ct-timepicker/ct-timepicker.module';
import { CtFilterChipModule } from './common-components/ct-filter-chip/ct-filter-chip.module';
import { CtFilterBarModule } from './common-components/ct-filter-bar/ct-filter-bar.module';

import { CtNotificationModule } from './widget/ct-notification/ct-notification.module';
import { CtNotificationDashboardModule } from './widget/ct-notification-dashboard/ct-notification-dashboard.module';

import { CtWidgetLoadingModule } from './widget/ct-widget-loading/ct-widget-loading.module';

import { CtLoadingSpinnerModule } from './widget/ct-loading-spinner/ct-loading-spinner.module';

import { UiNotificationsModule } from './core/ui-notifications/ui-notifications.module';

@NgModule({
  declarations: [],
  imports: [
    CtGooglePieChartModule,
    CtGoogleBarChartModule,
    CtGoogleTimeLineModule,
    CtGoogleLineChartModule,
    CtDatePickerModule,
    CtSelectModule,
    CtRangeSelectModule,
    CtInputModule,
    CtToggleModule,
    CtPhoneModule,
    CtReactiveFormModule,
    CtGridModule,
    CtCheckboxModule,
    CtTimepickerModule,
    CtFilterChipModule,
    CtFilterBarModule,
    CtNotificationModule,
    CtNotificationDashboardModule,
    CtWidgetLoadingModule,
    CtLoadingSpinnerModule,
    UiNotificationsModule,
  ],
  exports: [
    CtGooglePieChartModule,
    CtGoogleBarChartModule,
    CtGoogleTimeLineModule,
    CtDatePickerModule,
    CtSelectModule,
    CtRangeSelectModule,
    CtInputModule,
    CtToggleModule,
    CtPhoneModule,
    CtReactiveFormModule,
    CtGridModule,
    CtCheckboxModule,
    CtFilterChipModule,
    CtFilterBarModule,
    CtNotificationModule,
    CtNotificationDashboardModule,
    CtWidgetLoadingModule,
    CtLoadingSpinnerModule,
    UiNotificationsModule,
  ],
})
export class ComponentLibModule {}
