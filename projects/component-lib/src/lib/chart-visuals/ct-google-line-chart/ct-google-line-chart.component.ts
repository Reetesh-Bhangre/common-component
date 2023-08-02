import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleChartComponent, GoogleChartType } from 'ng2-google-charts';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'ct-google-line-chart',
  templateUrl: './ct-google-line-chart.component.html',
  styleUrls: ['./ct-google-line-chart.component.scss'],
})
export class CtGoogleLineChartComponent implements OnInit {
  //----- All Input Properties Listed Here -----//
  /** chartDataTable is a data which will be displayed on line Charts */
  @Input() chartDataTable;
  /** title is a chart title */
  @Input() title = '';
  /**
   * sliceColors is used to assign a colors of line chart.
   * As this is a input parameter user can provide the colors options.
   * if not it will take it from here.
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
    '#607D8B',
    '#ffcdd2',
  ];
  /** showLegend will maintain the visibility of Chart Legend */
  @Input() showLegend: string;
  /** bgColor will set the background color of chart area */
  @Input() bgColor: string;
  /** curveType will set the curve of line chart */
  @Input() curveType: string;
  /** focusType will set the type of focus and visible on line chart */
  @Input() focusType: string;
  /** pointsVisible will use to show points at every steps */
  @Input() pointsVisible: boolean;
  @Input() chartOptions: object;

  /** lineChart will help to get the reference of google chart component to draw it again */
  @ViewChild('ctGoogleLineChart') lineChart!: GoogleChartComponent;

  //----- All public variables are listed Here -----//
  /** chartReady flag will be set true once chart loaded into UI  */
  public chartReady = false;
  /** chartData is the object where we stored all chart related parameters  */
  public chartData: any;
  /** selectedChartItem will contain the selected item details of chart  */
  public selectedChartItem: any = {};

  constructor() {
    // constructor
  }

  //----- HostListener on resize is using to make visual responsive -----//
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.chartReady && this.lineChart) {
      this.lineChart.draw();
    }
  }

  ngOnInit(): void {
    this.setChartOptions();
    this.generateChartData();
  }

  /** Function trigger once chart is Loaded in UI and ready to use */
  onChartReady() {
    this.chartReady = true;
  }

  /** Function to generate chartData to assign in google line chart */
  generateChartData() {
    this.chartData = {
      chartType: GoogleChartType.LineChart,
      dataTable: cloneDeep(this.chartDataTable),
      options: this.chartOptions

    };
  }

  setChartOptions() {
    const defaultChartOptions = {
      pointsVisible: this.pointsVisible, // points will be displayed. Set to false to hide all points
      animation: {
        duration: 500, // value in milliseconds
        easing: 'linear', // 'linear', 'in', 'out', 'inAndOut'
        startup: true, // animate on the initial draw
      },
      axisTitlesPosition: 'in', // Where to place the axis titles, compared to the chart area "in", "out", "none"
      // chartArea is An object with members to configure the placement and size of the chart area (where the chart itself is drawn, excluding axis and legends).
      chartArea: {
        backgroundColor: this.bgColor ? this.bgColor : 'transparent',
        top: 5, 
        right: 0, 
        bottom: 20, 
        left: 40,
        width: '100%',
        height: '100%',
      },
      curveType: this.curveType ? this.curveType : 'none', // Controls the curve of the lines when the line width is not zero - 'none', 'function'
      colors: this.sliceColors, //this.chartSliceColors, // The colors to use for the chart elements. An array of strings, where each element is an HTML color string,
      dataOpacity: 0.75,
      backgroundColor: this.bgColor ? this.bgColor : 'transparent',
      focusTarget: this.focusType ? this.focusType : 'category', // Set a Focus, 'datum' - Focus on a single data point OR 'category' - Focus on a grouping of all data points along the major axis
      fontSize: '12',
      fontName: 'Arial',
      height: 250,
      // legend is An object with members to configure various aspects of the legend. To specify properties of this object
      legend: {
        position: this.showLegend ? this.showLegend : 'none', // 'top', 'right', 'bottom', 'left', "'none' - no legend", "'labeled' - Draws lines connecting slices to their data values."
        alignment: 'center',
        textStyle: {
          color: 'black',
          fontSize: 10,
          fontName: 'Arial', 
          bold: true,
          italic: false, 
        },
      },
      title: this.title,
      titleTextStyle: {
        color: 'black', 
        fontName: 'Arial', 
        fontSize: 13,
        bold: true,
        italic: false, 
      }
    };
    if (this.chartOptions) {  
      for(const key of Object.keys(this.chartOptions)){
        defaultChartOptions[key] = this.chartOptions[key];
      }
    } 
    this.chartOptions = structuredClone(defaultChartOptions);   
  }
}
