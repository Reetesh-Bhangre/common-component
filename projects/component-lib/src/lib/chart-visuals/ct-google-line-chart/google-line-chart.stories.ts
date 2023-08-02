import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CtGoogleLineChartModule } from './ct-google-line-chart.module';
import { CtGoogleLineChartComponent } from './ct-google-line-chart.component';
export default {
  title: 'Component/Google Chart/Line Chart',
  component: CtGoogleLineChartComponent,
  argTypes: {
    onChartSelect: { control: { type: null } },
  },
  decorators: [
    moduleMetadata({
      imports: [CtGoogleLineChartModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  template: `
    <ct-google-line-chart [chartDataTable]="chartDataTable" [pointsVisible]="pointsVisible">
    </ct-google-line-chart>
  `,
});

export const lineChart = TemplateDefault.bind({});
lineChart.args = {
  chartDataTable: [
    [
      'Year',
      'Truck Empty',
      'Truck Arrival',
      'Truck Transaction',
      'Truck Departing',
      'Dock Locked',
    ],
    ['12AM', 100, 100, 300, 200, 200],
    ['01AM', 100, 200, 300, 200, 100],
    ['02AM', 100, 100, 300, 200, 50],
    ['03AM', 500, 200, 300, 200, 105],
    ['04AM', 500, 400, 300, 200, 150],
    ['05AM', 500, 400, 300, 200, 250],
    ['06AM', 500, 400, 300, 200, 350],
    ['07AM', 500, 400, 300, 200, 300],
    ['08AM', 500, 400, 300, 200, 0],
    ['09AM', 500, 400, 300, 200, 0],
    ['10AM', 500, 400, 300, 200, 0],
    ['11AM', 500, 400, 300, 200, 0],
    ['12PM', 500, 400, 300, 200, 0],
    ['01PM', 500, 400, 300, 200, 0],
    ['02PM', 500, 400, 300, 200, 0],
    ['03PM', 500, 400, 300, 200, 0],
    ['04PM', 500, 400, 300, 200, 0],
    ['05PM', 500, 400, 300, 200, 0],
    ['06PM', 500, 400, 300, 200, 0],
    ['07PM', 500, 400, 300, 200, 0],
    ['08PM', 500, 400, 300, 200, 0],
    ['09PM', null, null, null, null, null],
    ['10PM', null, null, null, null, null],
    ['11PM', null, null, null, null, null],
    ['12AM', null, null, null, null, null],
  ],
  pointsVisible: false,
  title: '',
  sliceColors: ['#4782B9', '#CC4F4F', '#FBA612', '#80CB94'],
  onChartSelect: $event => {
    console.log('On Pie chart Click Event', $event);
  },
};
export const lineChartColorOption = TemplateDefault.bind({});
lineChartColorOption.args = {
  chartDataTable: [
    [
      'Year',
      'Truck Empty',
      { role: 'style' },
      'Truck Arrival',
      { type: 'string', id: 'style', role: 'style' },
      'Truck Transaction',
      { type: 'string', id: 'style', role: 'style' },
      'Truck Departing',
      { type: 'string', id: 'style', role: 'style' },
      'Dock Locked',
      { type: 'string', id: 'style', role: 'style' },
    ],
    ['12AM', 100, '#478', 100, '#CC4', 300, '#FBA', 200, '#80C', 200, '#dee'],
    ['01AM', 100, '#478', 200, '#CC4', 300, '#FBA', 200, '#80C', 100, '#dee'],
    ['02AM', 100, '#478', 100, '#CC4', 300, '#FBA', 200, '#80C', 50, '#dee'],
    ['03AM', 500, '#478', 200, '#CC4', 300, '#FBA', 200, '#80C', 105, '#dee'],
    ['04AM', 500, '#478', 400, '#CC4', 300, '#FBA', 200, '#80C', 150, '#dee'],
    ['05AM', 500, '#478', 400, '#CC4', 300, '#FBA', 200, '#80C', 250, '#dee'],
  ],
  title: '',
  sliceColors: ['#4782B9', '#CC4F4F', '#FBA612', '#80CB94'],
  onChartSelect: $event => {
    console.log('On Pie chart Click Event', $event);
  },
};

const ConfigurableTemplate: Story = args => ({
  props: args,
  template: `
    <ct-google-line-chart [chartDataTable]="chartDataTable" [pointsVisible]="pointsVisible" [chartOptions]="chartOptions">
    </ct-google-line-chart>
  `,
});
export const ConfigurableLineChart = ConfigurableTemplate.bind({});

ConfigurableLineChart.args = {
  chartDataTable: [
    [
      {
        label: 'Date',
        type: 'date',
        role: 'domain',
        id: 'title',
      },
      { label: 'Arriving', type: 'number', role: 'data', id: 'Truck Arrival' },
      {
        type: 'string',
        id: 'S1',
        role: 'style',
      },
      'Locked',
      {
        type: 'string',
        id: 'style',
        role: 'style',
      },
      'Transition',
      {
        type: 'string',
        id: 'style',
        role: 'style',
      },
      'Departing',
      {
        type: 'string',
        id: 'style',
        role: 'style',
      },
    ],
    [
      new Date(2023, 1, 1),
      35,
      '#00D764',
      6,
      '#f21e00',
      38,
      '#f7c815',
      33,
      '#246cf9',
    ],
    [
      new Date(2023, 1, 2),
      34,
      '#00D764',
      8,
      '#f21e00',
      32,
      '#f7c815',
      37,
      '#246cf9',
    ],
    [
      new Date(2023, 1, 3),
      38,
      '#00D764',
      9,
      '#f21e00',
      27,
      '#f7c815',
      32,
      '#246cf9',
    ],
    [
      new Date(2023, 1, 4),
      34,
      '#00D764',
      2,
      '#f21e00',
      37,
      '#f7c815',
      34,
      '#246cf9',
    ],
    [
      new Date(2023, 1, 5),
      34,
      '#00D764',
      8,
      '#f21e00',
      34,
      '#f7c815',
      35,
      '#246cf9',
    ],
    [
      new Date(2023, 1, 6),
      29,
      '#00D764',
      12,
      '#f21e00',
      32,
      '#f7c815',
      40,
      '#246cf9',
    ],
    [
      new Date(2023, 1, 7),
      30,
      '#00D764',
      10,
      '#f21e00',
      12,
      '#f7c815',
      44,
      '#246cf9',
    ],
    [
      new Date(2023, 1, 8),
      19,
      '#00D764',
      11,
      '#f21e00',
      33,
      '#f7c815',
      43,
      '#246cf9',
    ],
    [
      new Date(2023, 1, 9),
      19,
      '#00D764',
      2,
      '#f21e00',
      2,
      '#f7c815',
      0,
      '#246cf9',
    ],
    [
      new Date(2023, 1, 10),
      22,
      '#00D764',
      23,
      '#f21e00',
      24,
      '#f7c815',
      8,
      '#246cf9',
    ],
  ],
  title: '',
  sliceColors: ['#00D764', '#f21e00', '#f7c815', '#246cf9'],
  onChartSelect: $event => {
    console.log('On Line chart Click Event', $event);
  },
  chartOptions: {
    lineWidth: 3,
    crosshair: {
      trigger: 'selection',
      color: 'black',
      orientation: 'vertical',
    }, // Display crosshairs on focus and selection.
    explorer: {
      actions: ['dragToPan', 'rightClickToReset'],
      axis: 'horizontal',
      keepInBounds: false,
      maxZoomIn: 6.0,
    },
    tooltip: { isHtml: true, trigger: 'selection' },
    // Label font setting of X Axis
    hAxis: {
      format: 'dd MMM',
      gridlines: {
        minSpacing: 20,
        count: 0,
        color: 'transparent',
      },
      minorGridlines: {
        count: 0,
      },
      textStyle: {
        fontSize: 10,
      },
      viewWindow: {
        min: new Date(2023, 1, 1),
        max: new Date(2023, 1, 10),
      },
    },
    vAxis: {
      minValue: 0,
      maxValue: 24,
      gridlines: {
        multiple: 1,
      },
      minorGridlines: {
        count: 0,
      },
      textStyle: {
        fontSize: 10,
      },
    },
  },
};
