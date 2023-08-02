import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GoogleChartComponent, GoogleChartType } from 'ng2-google-charts';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'ct-google-pie-chart',
  templateUrl: './ct-google-pie-chart.component.html',
  styleUrls: ['./ct-google-pie-chart.component.scss'],
})
export class CtGooglePieChartComponent implements OnInit {
  //----- All Input Properties Listed Here -----//
  /** chartDataTable is a data which will be displayed on Pie Charts */
  @Input() chartDataTable;
  /** title is a chart title */
  @Input() title = '';
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
  /** */
  @Input() height: number;
  /** */
  @Input() bgColor: string;

  //----- All Output Properties Listed Here -----//
  /** Emitting the selected row data afterClicking on bar chart  */
  @Output() onChartSelect: EventEmitter<unknown> = new EventEmitter();

  /** barChart will help to get the reference of google chart component to draw it again  */
  @ViewChild('ctGooglePieChart') pieChart!: GoogleChartComponent;

  /** All public variables are listed Here */
  /** chartData is the object where we stored all chart related parameters */
  public chartData: any;
  /** chartReady flag will be set true once chart loaded into UI */
  public chartReady = false;
  /** selectedChartItem will contain the selected item details of chart */
  public selectedChartItem: any = {};

  constructor() {
    // constructor
  }

  //----- HostListener on resize is using to make visual responsive -----//
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.chartReady && this.pieChart) {
      this.pieChart.draw();
    }
  }

  ngOnInit(): void {
    // Function to generate chartData
    this.generateChartData();
  }

  /** Function trigger once chart is loaded in UI and ready for Use */
  onChartReady() {
    this.chartReady = true;
  }

  /** Function to generate chartData to assign in google pie chart */
  generateChartData() {
    if (this.chartDataTable) {
      this.chartData = {
        chartType: GoogleChartType.PieChart,
        dataTable: cloneDeep(this.chartDataTable),
        options: {
          title: this.title, // title of chart
          colors: this.sliceColors, // The colors to use for the chart elements. An array of strings, where each element is an HTML color string,
          pieHole: 0, // value between 0 and 1, displays a donut chart. The hole with have a radius equal to number times the radius of the chart.
          height: this.height ? this.height : 'auto', // Height of the chart, in pixels
          // titleTextStyle is An object that specifies the title text style
          titleTextStyle: {
            color: 'black', // Title Color
            fontName: 'Arial', // Title Font Family
            fontSize: 13, // Title Font Size
            bold: true, // Title Font Weight
            italic: false, // Title Font Style
          },
          backgroundColor: this.bgColor ? this.bgColor : 'transparent',
          // legend is An object with members to configure various aspects of the legend. To specify properties of this object
          legend: {
            position: this.showLegend ? this.showLegend : 'none', // 'top', 'right', 'bottom', 'left', "'none' - no legend", "'labeled' - Draws lines connecting slices to their data values."
            alignment: 'center', // 'start', 'center', 'end'
            textStyle: {
              color: 'black', // legend color in string
              fontSize: 10, // legend font size in points
              fontName: 'Arial', // legend font family
              bold: true, // legend font Weight
              italic: false, // legend font Style
            },
          },
          // chartArea is An object with members to configure the placement and size of the chart area (where the chart itself is drawn, excluding axis and legends).
          chartArea: {
            top: 10, // Spacing from top in points
            right: 10, // Spacing from right in points
            bottom: 10, // Spacing from bottom in points
            left: 10, // Spacing from left in points
            width: '100%', // Chart area width
            height: '100%', // Chart area height
          },
        },
      };
    }
  }

  /** */
  refreshChart(pieChartData) {
    this.generateChartData();
    this.pieChart.wrapper.setDataTable(pieChartData);
    this.pieChart.draw();
  }

  /** getSelectedSlice function to get the selected slice of chart */
  getSelectedSlice(event) {
    this.selectedChartItem = event;
  }

  /** onChartClick Function to calculate data and emit */
  onChartClick() {
    if (this.pieChart) {
      setTimeout(() => {
        /** Check if chart has any selected Item if not the length is 0 of selectedData  */
        const selectedData = this.pieChart.wrapper.visualization.getSelection();
        /** generate emittedData based on selectedData length  */
        const chartDataInfo =
          selectedData.length > 0
            ? {
                selectedItem: this.selectedChartItem,
                chartData: this.chartData.dataTable,
              }
            : { selectedItem: {}, chartData: this.chartData.dataTable };

        this.onChartSelect.emit(chartDataInfo);
      }, 50);
    }
  }
}
