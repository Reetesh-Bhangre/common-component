import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';

import apiData from '../../../../../../src/assets/mock-data/apiResponse.json';

import { CtGoogleTimeLineModule } from './ct-google-time-line.module';
import { CtGoogleTimeLineComponent } from './ct-google-time-line.component';
export default {
  title: 'Component/Google Chart/Time Line',
  component: CtGoogleTimeLineComponent,
  argTypes: {
    onChartSelect: { control: { type: null } },
  },
  decorators: [
    moduleMetadata({
      imports: [CtGoogleTimeLineModule, BrowserAnimationsModule],
      schemas: [],
      declarations: [],
      entryComponents: [],
    }),
  ],
} as unknown as Meta;

const TemplateDefault: Story = args => ({
  props: args,
  template: `
  <span>{{date}}</span>
    <ct-google-time-line 
        [chartDataTable]="chartDataTable"
        [sliceColors]="sliceColors"
        [bgColor]="bgColor"
        [withDarkTheme]="true"
        (onChartSelect)="onChartSelect($event)"
        (chartReadyWrapEvent)="check($event)">
    </ct-google-time-line>
  `,
});

export const timeLine = TemplateDefault.bind({});
timeLine.args = {
  //   apiData: summaryByDay,
  chartDataTable: [
    ['Name', 'Status', 'Start', 'End'],

    [
      'Dock_26',
      'Truck Transaction', //'Truck Arrival',
      new Date('2022-06-01T05:44:32.000Z'),
      new Date('2022-06-01T16:10:36.000Z'),
    ],
    [
      'Dock_26',
      'Truck Departing', //'Truck Transaction',
      new Date('2022-06-01T16:10:36.000Z'),
      new Date('2022-06-01T17:42:42.000Z'),
    ],
    [
      'Dock_26',
      'No Truck', //'Truck Departing',
      new Date('2022-06-01T17:42:42.000Z'),
      new Date('2022-06-01T18:30:00.000Z'),
    ],
    [
      'Dock_26',
      'Truck Arrival', //'No Truck',
      new Date('2022-05-31T18:30:00.000Z'),
      new Date('2022-06-01T05:44:32.000Z'),
    ],
    [
      'Dock_24',
      'No Truck',
      new Date('2022-05-31T18:30:00.000Z'),
      new Date('2022-06-01T13:54:25.000Z'),
    ],
    [
      'Dock_24',
      'Truck Arrival',
      new Date('2022-06-01T13:54:25.000Z'),
      new Date('2022-06-01T15:32:10.000Z'),
    ],
    [
      'Dock_24',
      'Truck Transaction',
      new Date('2022-06-01T15:32:10.000Z'),
      new Date('2022-06-01T18:17:38.000Z'),
    ],
    [
      'Dock_24',
      'Truck Departing',
      new Date('2022-06-01T18:17:38.000Z'),
      new Date('2022-06-01T18:30:00.000Z'),
    ],
    [
      'Dock_22',
      'Truck Transaction',
      new Date('2022-05-31T18:30:00.000Z'),
      new Date('2022-06-01T18:30:00.000Z'),
    ],
    [
      'Dock_20',
      'Truck Transaction',
      new Date('2022-05-31T18:30:00.000Z'),
      new Date('2022-06-01T18:30:00.000Z'),
    ],
    [
      'Dock_18',
      'Truck Transaction',
      new Date('2022-05-31T18:30:00.000Z'),
      new Date('2022-05-31T20:23:10.000Z'),
    ],
    [
      'Dock_18',
      'Truck Departing',
      new Date('2022-05-31T20:23:10.000Z'),
      new Date('2022-06-01T03:30:00.000Z'),
    ],
    [
      'Dock_18',
      'Dock Locked',
      new Date('2022-06-01T03:30:00.000Z'),
      new Date('2022-06-01T18:30:00.000Z'),
    ],
    [
      'Dock_14',
      'No Truck',
      new Date('2022-05-31T18:30:00.000Z'),
      new Date('2022-06-01T04:47:29.000Z'),
    ],
    [
      'Dock_14',
      'Truck Arrival',
      new Date('2022-06-01T04:47:29.000Z'),
      new Date('2022-06-01T05:21:22.000Z'),
    ],
    [
      'Dock_14',
      'Truck Transaction',
      new Date('2022-06-01T05:21:22.000Z'),
      new Date('2022-06-01T09:07:37.000Z'),
    ],
    [
      'Dock_14',
      'Truck Departing',
      new Date('2022-06-01T09:07:37.000Z'),
      new Date('2022-06-01T18:30:00.000Z'),
    ],
    [
      'Dock_12',
      'No Truck',
      new Date('2022-05-31T18:30:00.000Z'),
      new Date('2022-06-01T10:30:03.000Z'),
    ],
    [
      'Dock_12',
      'Truck Arrival',
      new Date('2022-06-01T10:30:03.000Z'),
      new Date('2022-06-01T12:07:11.000Z'),
    ],
    [
      'Dock_12',
      'Truck Transaction',
      new Date('2022-06-01T12:07:11.000Z'),
      new Date('2022-06-01T12:43:48.000Z'),
    ],
    [
      'Dock_12',
      'Truck Departing',
      new Date('2022-06-01T12:43:48.000Z'),
      new Date('2022-06-01T18:30:00.000Z'),
    ],
  ],
  sliceColors: ['#4782B9', '#CC4F4F', '#FBA612', '#80CB94', '#607D8B'],
  apiData: apiData,
  date: '2022-05-01',
  calculatedBy: 'seconds',
  title: 'Google Chart POC',
  bgColor: '#060D0D',
  onChartSelect: $event => {
    console.log('On Time Line chart Click Event', $event);
  },
  check: $event => {
    console.log('On Time Line check Click Event', $event);
  }
};



const ConfigurableTemplate: Story = args => ({
  props: args,
  template: `
  <ct-google-time-line 
  [chartDataTable]="chartDataTable"
  [sliceColors]="sliceColors"
  [bgColor]="bgColor"
  [withDarkTheme]="true"
  (onChartSelect)="onChartSelect($event)" 
  [chartOptions]="chartOptions" 
  (chartReadyWrapEvent)="check($event)">
</ct-google-time-line>
 
  `,
});
export const ConfigurableTimeLineChart = ConfigurableTemplate.bind({});

ConfigurableTimeLineChart.args = {
  chartDataTable: [
    ['Name', 'Status', 'Start', 'End'],
    
      [ 'dock door1', 'A',  new Date(2014, 10, 15, 0, 0),
         new Date(2014, 10, 15, 6, 0) ],
      [ 'dock door1', 'B', new Date(2014, 10, 15, 6, 0),
         new Date(2014, 10, 15, 12, 0) ],
      [ 'dock door1', 'C', new Date(2014, 10, 15, 12, 0),
         new Date(2014, 10, 15, 18, 0) ],
       [ 'dock door1', 'D', new Date(2014, 10, 15, 18, 0),
                new Date(2014, 10, 15, 24, 0) ],

         [ 'dock door1', 'A',  new Date(2014, 10, 16, 0, 0),
         new Date(2014, 10, 16, 6, 0) ],
      [ 'dock door1', 'B', new Date(2014, 10, 16, 6, 0),
         new Date(2014, 10, 16, 12, 0) ],
      [ 'dock door1', 'C', new Date(2014, 10, 16, 12, 0),
         new Date(2014, 10, 16, 18, 0) ],
       [ 'dock door1', 'D', new Date(2014, 10, 16, 18, 0),
                       new Date(2014, 10, 16, 24, 0) ],

         [ 'dock door1', 'A',  new Date(2014, 10, 17, 0, 0),
         new Date(2014, 10, 17, 6, 0) ],
      [ 'dock door1', 'B', new Date(2014, 10, 17, 6, 0),
         new Date(2014, 10, 17, 12, 0) ],
      [ 'dock door1', 'C', new Date(2014, 10, 17, 12, 0),
         new Date(2014, 10, 17, 18, 0) ],
       [ 'dock door1', 'D', new Date(2014, 10, 17, 18, 0),
                       new Date(2014, 10, 17, 24, 0) ],
                       
      [ 'dock door1', 'A',  new Date(2014, 10, 18, 0, 0),
         new Date(2014, 10, 18, 6, 0) ],
      [ 'dock door1', 'B', new Date(2014, 10, 18, 6, 0),
         new Date(2014, 10, 18, 12, 0) ],
      [ 'dock door1', 'C', new Date(2014, 10, 18, 12, 0),
         new Date(2014, 10, 18, 18, 0) ],
       [ 'dock door1', 'D', new Date(2014, 10, 18, 18, 0),
                       new Date(2014, 10, 18, 24, 0) ],
                       
       [ 'dock door1', 'A',  new Date(2014, 10, 19, 0, 0),
         new Date(2014, 10, 19, 6, 0) ],
      [ 'dock door1', 'B', new Date(2014, 10, 19, 6, 0),
         new Date(2014, 10, 19, 12, 0) ],
      [ 'dock door1', 'C', new Date(2014, 10, 19, 12, 0),
         new Date(2014, 10, 19, 18, 0) ],
       [ 'dock door1', 'D', new Date(2014, 10, 19, 18, 0),
                       new Date(2014, 10, 19, 24, 0) ],
                       
      [ 'dock door1', 'A',  new Date(2014, 10, 20, 0, 0),
         new Date(2014, 10, 20, 6, 0) ],
      [ 'dock door1', 'B', new Date(2014, 10, 20, 6, 0),
         new Date(2014, 10, 20, 12, 0) ],
      [ 'dock door1', 'C', new Date(2014, 10, 20, 12, 0),
         new Date(2014, 10, 20, 18, 0) ],
       [ 'dock door1', 'D', new Date(2014, 10, 20, 18, 0),
                       new Date(2014, 10, 20, 24, 0) ],

                       [ 'dock door2', 'A',  new Date(2014, 10, 15, 0, 0),
                       new Date(2014, 10, 15, 6, 0) ],
                    [ 'dock door2', 'B', new Date(2014, 10, 15, 6, 0),
                       new Date(2014, 10, 15, 12, 0) ],
                    [ 'dock door2', 'C', new Date(2014, 10, 15, 12, 0),
                       new Date(2014, 10, 15, 18, 0) ],
                     [ 'dock door2', 'D', new Date(2014, 10, 15, 18, 0),
                              new Date(2014, 10, 15, 24, 0) ],
              
                       [ 'dock door2', 'A',  new Date(2014, 10, 16, 0, 0),
                       new Date(2014, 10, 16, 6, 0) ],
                    [ 'dock door2', 'B', new Date(2014, 10, 16, 6, 0),
                       new Date(2014, 10, 16, 12, 0) ],
                    [ 'dock door2', 'C', new Date(2014, 10, 16, 12, 0),
                       new Date(2014, 10, 16, 18, 0) ],
                     [ 'dock door2', 'D', new Date(2014, 10, 16, 18, 0),
                                     new Date(2014, 10, 16, 24, 0) ],
              
                       [ 'dock door2', 'A',  new Date(2014, 10, 17, 0, 0),
                       new Date(2014, 10, 17, 6, 0) ],
                    [ 'dock door2', 'B', new Date(2014, 10, 17, 6, 0),
                       new Date(2014, 10, 17, 12, 0) ],
                    [ 'dock door2', 'C', new Date(2014, 10, 17, 12, 0),
                       new Date(2014, 10, 17, 18, 0) ],
                     [ 'dock door2', 'D', new Date(2014, 10, 17, 18, 0),
                                     new Date(2014, 10, 17, 24, 0) ],
                                     
                    [ 'dock door2', 'A',  new Date(2014, 10, 18, 0, 0),
                       new Date(2014, 10, 18, 6, 0) ],
                    [ 'dock door2', 'B', new Date(2014, 10, 18, 6, 0),
                       new Date(2014, 10, 18, 12, 0) ],
                    [ 'dock door2', 'C', new Date(2014, 10, 18, 12, 0),
                       new Date(2014, 10, 18, 18, 0) ],
                     [ 'dock door2', 'D', new Date(2014, 10, 18, 18, 0),
                                     new Date(2014, 10, 18, 24, 0) ],
                                     
                     [ 'dock door2', 'A',  new Date(2014, 10, 19, 0, 0),
                       new Date(2014, 10, 19, 6, 0) ],
                    [ 'dock door2', 'B', new Date(2014, 10, 19, 6, 0),
                       new Date(2014, 10, 19, 12, 0) ],
                    [ 'dock door2', 'C', new Date(2014, 10, 19, 12, 0),
                       new Date(2014, 10, 19, 18, 0) ],
                     [ 'dock door2', 'D', new Date(2014, 10, 19, 18, 0),
                                     new Date(2014, 10, 19, 24, 0) ],
                                     
                    [ 'dock door2', 'A',  new Date(2014, 10, 20, 0, 0),
                       new Date(2014, 10, 20, 6, 0) ],
                    [ 'dock door2', 'B', new Date(2014, 10, 20, 6, 0),
                       new Date(2014, 10, 20, 12, 0) ],
                    [ 'dock door2', 'C', new Date(2014, 10, 20, 12, 0),
                       new Date(2014, 10, 20, 18, 0) ],
                     [ 'dock door2', 'D', new Date(2014, 10, 20, 18, 0),
                                     new Date(2014, 10, 20, 24, 0) ],

  ],
  sliceColors: ['#4782B9', '#CC4F4F', '#FBA612', '#80CB94', '#607D8B'],
  apiData: apiData,
  date: '2022-05-01',
  calculatedBy: 'seconds',
  title: 'Google Chart POC',
  bgColor: '#060D0D',
  onChartSelect: $event => {
    console.log('On Time Line chart Click Event', $event);
  },
  check: ($event)=> {
    console.log('onChartReady', $event);
  },
  chartOptions: {
    avoidOverlappingGridLines: false,
      timeline: {
           showBarLabels: false,
          alternatingRowStyle: false,
          colorByRowLabel: false,
          groupByRowLabel: true,
          barLabelStyle: {
            fontName: 'Arial',
            fontSize: 10,
            color: '#FFF',
          },
          rowLabelStyle: {
            fontName: 'Arial',
            fontSize: 10,
            color: '#FFF',
          },
      },
  },
};
