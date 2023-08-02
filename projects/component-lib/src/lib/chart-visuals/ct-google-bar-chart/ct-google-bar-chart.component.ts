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
  selector: 'ct-google-bar-chart',
  templateUrl: './ct-google-bar-chart.component.html',
  styleUrls: ['./ct-google-bar-chart.component.scss'],
})
export class CtGoogleBarChartComponent implements OnInit {
  //----- All Input Properties Listed Here -----//
  /** chartDataTable is a data which will be displayed on Pie Charts */
  @Input() chartDataTable;
  /** title is a chart title */
  @Input() title = '';
  /**
   * sliceColors is used to assign a colors of pie chart slices.
   * As this is a input parameter user can provide the colors options.
   * if not it will take it from here.
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
  /** isStacked will maintain the bar chart is Stacked view OR not */
  @Input() isStacked = false;
  /** showLegend will maintain the visibility of Chart Legend */
  @Input() showLegend: string;
  /** */
  @Input() bgColor: string;
  /** */
  @Input() focusType: string;

  //----- All Output Properties Listed Here -----//
  /** Emitting the selected row data afterClicking on bar chart */
  @Output() onChartSelect: EventEmitter<any> = new EventEmitter();

  /** barChart will help to get the reference of google chart component to draw it again */
  @ViewChild('ctGoogleBarChart') barChart!: GoogleChartComponent;

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
    if (this.chartReady && this.barChart) {
      this.barChart.draw();
    }
  }

  ngOnInit(): void {
    // Function to generate chartData
    this.generateChartData();
  }

  /** Function trigger once chart is Loaded in UI and ready to use */
  onChartReady() {
    this.chartReady = true;
  }

  /** Function to generate chartData to assign in google pie chart */
  generateChartData() {
    this.chartData = {
      chartType: GoogleChartType.ColumnChart,
      dataTable: cloneDeep(this.chartDataTable),
      options: {
        animation: {
          duration: 500, // value in milliseconds
          easing: 'linear', // 'linear', 'in', 'out', 'inAndOut'
          startup: true, // animate on the initial draw
          strokeWidth: 1,
          // Color of the box outline.
          stroke: '#888',
          // Thickness of the box outline.
        },
        annotations: {
          alwaysOutside: true,
        },
        axisTitlesPosition: 'in',
        bar: { groupWidth: '80%', bars: 'horizontal' }, // 'vertical'
        // chartArea is An object with members to configure the placement and size of the chart area (where the chart itself is drawn, excluding axis and legends).
        chartArea: {
          top: 10, // Spacing from top in points
          right: 10, // Spacing from right in points
          bottom: 20, // Spacing from bottom in points
          left: 75, // Spacing from left in points
          width: '100%', // Chart area width
          height: '100%', // Chart area height
        },
        backgroundColor: this.bgColor ? this.bgColor : 'transparent',
        focusTarget: this.focusType ? this.focusType : 'category', // Set a Focus, 'datum' - Focus on a single data point OR 'category' - Focus on a grouping of all data
        colors: this.sliceColors, //this.chartSliceColors, // The colors to use for the chart elements. An array of strings, where each element is an HTML color string,
        dataOpacity: 1,
        height: 350,
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
        title: this.title, // title of chart
        // titleTextStyle is An object that specifies the title text style
        titleTextStyle: {
          color: 'black', // Title Color
          fontName: 'Arial', // Title Font Family
          fontSize: 13, // Title Font Size
          bold: true, // Title Font Weight
          italic: false, // Title Font Style
        },
        // Label font setting of X Axis
        hAxis: {
          textStyle: {
            fontSize: 10,
          },
        },
        // Label font setting of Y Axis
        vAxis: {
          textStyle: {
            fontSize: 10,
          },
        },
        isStacked: this.isStacked,
      },
    };
  }

  /** getSelectedBar function to get selected slice of chart */
  getSelectedBar(event) {
    this.selectedChartItem = event;
  }

  /** onChartClick Function to calculate data and emit */
  onChartClick() {
    if (this.barChart) {
      setTimeout(() => {
        /** Check if chart has any selected Item if not the length is 0 of selectedData */
        const selectedData = this.barChart.wrapper.visualization.getSelection();
        /** generate emittedData based on selectedData length */
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
