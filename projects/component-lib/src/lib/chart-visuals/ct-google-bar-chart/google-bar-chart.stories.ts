import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

// import summaryByDay from '../../../../../../src/assets/mock-data/summaryByDay.json';

import apiData from '../../../../../../src/assets/mock-data/apiResponse.json';

import { CtGoogleBarChartModule } from './ct-google-bar-chart.module';
import { CtGoogleBarChartComponent } from './ct-google-bar-chart.component';
export default {
  title: 'Component/Google Chart',
  component: CtGoogleBarChartComponent,
  argTypes: {
    onChartSelect: { control: { type: null } },
  },
  decorators: [
    moduleMetadata({
      imports: [CtGoogleBarChartModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  //   template: `<ct-google-bar-chart
  //                 [chartDataTable]="chartDataTable"
  //                 [title]="title"
  //                 [sliceColors]="sliceColors"
  //                 [isStacked]="isStacked"
  //                 [apiData]="apiData"
  //                 [headerBy]="headerBy"
  //                 [calculatedBy]="calculatedBy"
  //                 [labelsBy]="labelsBy"
  //                 [dockName]="dockName"
  //                 [dockStatus]="dockStatus"
  //                 (onChartSelect)="onChartSelect($event)">
  //              </ct-google-bar-chart>`,

  template: `<ct-google-bar-chart 
                [chartDataTable]="chartDataTable"
                [title]="title"
                [sliceColors]="sliceColors"
                [isStacked]="isStacked"
                (onChartSelect)="onChartSelect($event)">
                </ct-google-bar-chart>`,
});

export const barChart = TemplateDefault.bind({});
barChart.args = {
  // apiData: summaryByDay,
  chartDataTable: [
    [
      'dockName',
      'No Truck',
      'Truck Arrival',
      'Truck Transaction',
      'Truck Departing',
    ],
    ['Dock_01', 0, 0, 0, 0],
    ['Dock_02', 0, 0, 9600, 0],
    ['Dock_04', 0, 0, 8160, 0],
    ['Dock_06', 0, 0, 219, 1949],
    ['Dock_08', 3240, 2959, 1773, 1615],
    ['Dock_10', 3378, 2868, 1112, 2229],
    ['Dock_12', 3569, 2104, 1447, 2466],
    ['Dock_14', 3995, 2291, 1094, 2205],
    ['Dock_16', 3261, 1103, 3276, 513],
    ['Dock_18', 0, 0, 1590, 8003],
    ['Dock_20', 0, 0, 9600, 0],
    ['Dock_22', 749, 378, 6905, 1561],
    ['Dock_24', 5707, 2338, 496, 1047],
    ['Dock_26', 4550, 1974, 2002, 1063],
  ],
  title: 'Google Bar POC',
  sliceColors: ['#4782B9', '#CC4F4F', '#FBA612', '#80CB94'],
  isStacked: false,
  ////////////////
  apiData: apiData.data.docks,
  headerBy: 'dockStateDescription',
  calculatedBy: 'minutes',
  labelsBy: 'dockName',
  dockName: [
    ['Dock_01'],
    ['Dock_02'],
    ['Dock_04'],
    ['Dock_06'],
    ['Dock_08'],
    ['Dock_10'],
    ['Dock_12'],
    ['Dock_14'],
    ['Dock_16'],
    ['Dock_18'],
    ['Dock_20'],
    ['Dock_22'],
    ['Dock_24'],
    ['Dock_26'],
  ],
  dockStatus: [
    'No Truck',
    'Truck Arrival',
    'Truck Transaction',
    'Truck Departing',
  ],
  onChartSelect: $event => {
    console.log('On Bar chart Click Event', $event);
  },
};
