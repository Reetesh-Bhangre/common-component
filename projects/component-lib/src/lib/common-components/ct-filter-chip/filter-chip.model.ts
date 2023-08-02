export enum FilterChipType {
    input = 'ctInput',
    select = 'ctSelect',
    datepicker = 'ctDatepicker',
    timepicker = 'xgTimePicker'
}
// Interface of the data object passed to the FilterChip decorator
export interface IFilterChipDecorator {
    id: string;
    globalError?: boolean;
    // The client side filter chip comparisons takes a string id for
    // a FilterComparison from the FilterComparisonFactoryRegistry,
    // the registry is part of xg-filter-service but comparison
    // functions can be registered from anywhere in the application.
    comparisons?: object[] | string[];
    supportCrossFiltering?: boolean;
}

// Interface for the data that is stored in the FilterChipRegistry
export interface IFilterChipDecoratorRegistry extends IFilterChipDecorator {
    // A reference to the component class to use in the filter chip
    target: any;
}