import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { cloneDeep } from 'lodash';

import { ChartReadyEvent, GoogleChartComponent, GoogleChartType } from 'ng2-google-charts';

@Component({
  selector: 'ct-google-time-line',
  templateUrl: './ct-google-time-line.component.html',
  styleUrls: ['./ct-google-time-line.component.scss'],
})
export class CtGoogleTimeLineComponent implements OnInit {
  //----- All Input Properties Listed Here -----//
  /** chartDataTable is a data which will be displayed on Pie Charts */
  @Input() chartDataTable;
  /**
   * sliceColors is used to assign a colors of pie chart slices
   * As this is a input parameter user can provide the colors options
   * if not it will take it from here
   */
  @Input() sliceColors: string[] = [
    '#4782B9',
    '#CC4F4F',
    '#FBA612',
    '#80CB94',
    '#607D8B',
    '#CCCCCC',
    '#80cbc4',
    '#00bcd4',
    '#e91e63',
    '#8e24aa',
    '#ffb300',
    '#e57373',
    '#ce93d8',
    '#dcedc8',
    '#e53935',
    '#ffcdd2',
  ];
  /** Height of the timeLine Chart */
  @Input() height: number;
  /** */
  @Input() bgColor: string;
  /** */
  @Input() withDarkTheme = false;

  //----- All output Properties Listed Here -----//
  /** Emitting the selected row data afterClicking on bar chart */
  @Output() onChartSelect: EventEmitter<unknown> = new EventEmitter();

  
  @Output() chartReadyWrapEvent: EventEmitter<ChartReadyEvent> = new EventEmitter();


  /** barChart will help to get the reference of google chart component to draw it again */
  @ViewChild('ctGoogleTimeLine') timeLineChart!: GoogleChartComponent;

  //----- All public variables are listed Here -----//
  /** chartData is the object where we stored all chart related parameters */
  public chartData: any;
  /** chartReady flag will be set true once chart loaded into UI */
  public chartReady = false;
  /** selectedChartItem will contain the selected item details of chart */
  public selectedChartItem: any = {};

  public chartColorPalette = {
    'No Truck': '#4782B9',
    'Truck Arrival': '#CC4F4F',
    'Truck Transaction': '#FBA612',
    'Truck Departing': '#80CB94',
  };

  colors = [];
  @Input() chartOptions: object;


  constructor() {
    // constructor
  }

  //----- HostListener on resize is using to make visual responsive -----//
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.chartReady && this.timeLineChart) {
      this.timeLineChart.draw();
    }
  }

  ngOnInit(): void {
    this.setChartOptions();
    this.getColors();
    // Function to generate chartData
   this.generateChartData();

  }

  generateChartData(){
    this.chartData = {
      chartType: GoogleChartType.Timeline,
      dataTable: cloneDeep(this.chartDataTable),
      options: this.chartOptions

    };
  }


  /** Function trigger once chart is loaded in UI and ready for Use */
  onChartReady(event: ChartReadyEvent) {
    this.chartReady = true;
    if (this.withDarkTheme) {
      document.querySelector(
        'rect[stroke-width="1"][stroke="#9a9a9a"]'
      ).attributes['stroke-width'].value = 0;

      const textList = document.querySelectorAll('text[fill="#000000"]');
      textList.forEach(list => {
        list.attributes['fill'].value = '#FFF';
      });
    }
    this.chartReadyWrapEvent.emit(event);
  }

  getColors() {
    const labels = this.getLabels();
    labels.forEach((status: string, key) => {
      const colorCode = this.chartColorPalette[status]
        ? this.chartColorPalette[status]
        : this.sliceColors[key];
      this.colors.push(colorCode);
    });
  }

  getLabels() {
    if (this.chartDataTable && this.chartDataTable.length > 0) {
      const labels = [
        ...new Set(
          this.chartDataTable.map((value, key) => {
            if (key > 0 && value[1] !== undefined) {
              return value[1];
            }
          })
        ),
      ];
      if (labels[0] === undefined) {
        labels.shift();
      }
      return labels;
    }
    return [];
  }

  /** getSelectedTimeLine function to emit the selected item of chart */
  getSelectedTimeLine(event) {
    this.selectedChartItem = event;
    /** generate emittedData based on selectedData length */
    const chartDataInfo = {
      selectedItem: this.selectedChartItem,
      chartData: this.chartData.dataTable,
    };

    this.onChartSelect.emit(chartDataInfo);
  }

  
  setChartOptions() {
    const defaultChartOptions = {
        fontName: 'Arial',
        fontSize: 10,
        height: this.height ? this.height : 290,
        backgroundColor: this.bgColor ? this.bgColor : 'transparent',
        bar: { groupHeight: 7 }
    };
   
    if (this.chartOptions) {  
      for(const key of Object.keys(this.chartOptions)){
        defaultChartOptions[key] = this.chartOptions[key];
      }
    } 
    this.chartOptions = structuredClone(defaultChartOptions);  
  }
}
