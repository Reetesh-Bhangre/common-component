import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

// import summaryByDay from '../../../../../../src/assets/mock-data/summaryByDay.json';

import apiData from '../../../../../../src/assets/mock-data/apiResponse.json';

import { CtGooglePieChartModule } from './ct-google-pie-chart.module';
import { CtGooglePieChartComponent } from './ct-google-pie-chart.component';
export default {
  title: 'Component/Google Chart',
  component: CtGooglePieChartComponent,
  argTypes: {
    onChartSelect: { control: { type: null } },
  },
  decorators: [
    moduleMetadata({
      imports: [CtGooglePieChartModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  //   template: `
  //     <ct-google-pie-chart
  //         [chartDataTable]="chartDataTable"
  //         [apiData]="apiData"
  //         [colHeader]="colHeader"
  //         [title]="title"
  //         [calculatedBy]="calculatedBy"
  //         [labelsBy]="labelsBy"
  //         [sliceColors]="sliceColors"
  //         (onChartSelect)="onChartSelect($event)">
  //     </ct-google-pie-chart>
  //   `,
  template: `
    <ct-google-pie-chart 
        [chartDataTable]="chartDataTable"
        [title]="title"
        [sliceColors]="sliceColors"
        (onChartSelect)="onChartSelect($event)">
    </ct-google-pie-chart>
  `,
});

export const pieChart = TemplateDefault.bind({});
pieChart.args = {
  //   apiData: summaryByDay,
  apiData: apiData,
  chartDataTable: [
    ['Dock State', 'Duration In Minutes'],
    ['No Truck', 5257],
    ['Truck Arrival', 1014],
    ['Truck Transaction', 5354],
    ['Truck Departing', 4203],
  ],
  colHeader: ['Dock Status', 'Duration In Minutes'],
  calculatedBy: 'minutes',
  labelsBy: 'dockStateDescription',
  title: '',
  sliceColors: ['#4782B9', '#CC4F4F', '#FBA612', '#80CB94'],
  onChartSelect: $event => {
    console.log('On Pie chart Click Event', $event);
  },
};
// No Truck - #4782B9
// Truck Arrival = #CC4F4F
// Truck Transaction = #FBA612
// Truck Departing = #80CB94
