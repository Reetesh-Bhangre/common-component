import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, sub } from 'date-fns';
@Component({
  selector: 'ct-reactive-form',
  templateUrl: './ct-reactive-form.component.html',
  styleUrls: ['./ct-reactive-form.component.scss'],
})
export class CtReactiveFormComponent implements OnInit {
  form!: FormGroup;
  public selectorList: any[] = [
    { id: 1, name: 'Dock_02' },
    { id: 2, name: 'Dock_04' },
    { id: 3, name: 'Dock_06' },
    { id: 4, name: 'Dock_08' },
    { id: 5, name: 'Dock_10' },
    { id: 6, name: 'Dock_12' },
    { id: 7, name: 'Dock_14' },
    { id: 8, name: 'Dock_16' },
    { id: 9, name: 'Dock_18' },
    { id: 10, name: 'Dock_20' },
    { id: 11, name: 'Dock_22' },
    { id: 12, name: 'Dock_24' },
    { id: 13, name: 'Dock_26' },
    { id: 14, name: 'Dock_XX' },
  ];
  public visibleProperty = 'name';
  public singleSelectionMode = true;
  public isSingleSelectionMode = false;
  public allowSearch = true;
  public allowClear = true;
  public multiSelectionLimit = 5;
  public allowSwitch = false;
  public allowStepLabels = true;
  public minRange = 1;
  public maxRange = 24;
  public allowPushRange = false;
  public sliderSteps = [
    { value: 0, legend: '12AM' },
    { value: 1, legend: '1AM' },
    { value: 2, legend: '2AM' },
    { value: 3, legend: '3AM' },
    { value: 4, legend: '4AM' },
    { value: 5, legend: '5AM' },
    { value: 6, legend: '6AM' },
    { value: 7, legend: '7AM' },
    { value: 8, legend: '8AM' },
    { value: 9, legend: '9AM' },
    { value: 10, legend: '10AM' },
    { value: 11, legend: '11AM' },
    { value: 12, legend: '12PM' },
    { value: 13, legend: '1PM' },
    { value: 14, legend: '2PM' },
    { value: 15, legend: '3PM' },
    { value: 16, legend: '4PM' },
    { value: 17, legend: '5PM' },
    { value: 18, legend: '6PM' },
    { value: 19, legend: '7PM' },
    { value: 20, legend: '8PM' },
    { value: 21, legend: '9PM' },
    { value: 22, legend: '10PM' },
    { value: 23, legend: '11PM' },
    { value: 24, legend: '12AM' },
  ];

  public ranges: any = {
    Today: [new Date(),new Date()],
    Yesterday: [sub(new Date(), {days: 1}),sub(new Date(), {days: 1})],
    'Last 3 Days': [sub(new Date(), {days: 3}), sub(new Date(), {days: 1})],
  // 'Last 14 Days': [sub(new Date(), {days: 13}), new Date()],
  // 'Last 30 Days': [sub(new Date(), {days: 29}), new Date()],
    'This Week': [startOfWeek(new Date()), endOfWeek(new Date())],
    'Last Week': [
    startOfWeek(sub(new Date(), {weeks: 1})),
    endOfWeek(sub(new Date(), {weeks: 1})),
    ],
    'Last 2 Week': [
      startOfWeek(sub(new Date(), {weeks: 2})),
      endOfWeek(sub(new Date(), {weeks: 1})),
    ],
  
    'This Month': [startOfMonth(new Date()), endOfMonth(new Date())],
    'Last Month': [
      startOfMonth(sub(new Date(), {months: 1})),
      endOfMonth(sub(new Date(), {months: 1})),
    ],
    // 'Last 3 Month': [
    //   startOfMonth(sub(new Date(), {months: 3})),
    //   endOfMonth(sub(new Date(), {months: 1})),
    // ],
  };
  // Set default date range label
  public defaultRangeLabel = 'This Week';
  constructor() {
    // TODO constructor
  }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm() {
    return new FormGroup({
      ctInput: new FormControl('Default Value'),
      materialRange: new FormControl('2022-05-17/2022-05-20'),
      materialDate: new FormControl('2022-05-17'),
      customRange: new FormControl(Validators.required), // Senario with no custom date supply
      customDate: new FormControl('2023-04-15'),
      singleSelect: new FormControl({ id: 1, name: 'Dock_02' }),
      noSelect: new FormControl(''),
      noSelected: new FormControl(''),
      multiSelect: new FormControl([
        { id: 1, name: 'Dock_02' },
        { id: 2, name: 'Dock_04' },
      ]),
      toggleBtn: new FormControl(true),
      rangeSelect: new FormControl([5, 10]),
      startTime: new FormControl({
        hour: 0,
        minute: 0,
      }),
      number: new FormControl({
        type: 'Work',
        number: '9012348765',
        code: '+91',
      }),
    });
  }

  onSubmit() {
    console.log('form here', this.form.value);
  }

  onReset() {
    this.form.reset();
  }
}
