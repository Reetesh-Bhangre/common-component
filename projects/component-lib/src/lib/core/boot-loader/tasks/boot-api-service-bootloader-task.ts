import { Injectable } from '@angular/core';

import { BaseBootloaderTask } from './base-bootloader-task';
import {
    BootConfigBootloaderTask
} from './boot-config-bootloader-task';
import { ApiEndpointsService } from '../../../services/api-loader/api-endpoints.service';
import { ApiEndpointParser } from '../../../services/api-loader/api-endpoint-parser';

//  Bootloader task to configure the ApiService using on the service config
//  loaded in boot-config file by the BootConfigBootloaderTask

@Injectable({
    providedIn: 'root'
})
export class ApiServiceBootloaderTask extends BaseBootloaderTask {
    constructor(
        private bootConfig: BootConfigBootloaderTask,
        private apiEndpointsService: ApiEndpointsService
    ) {
        super('ApiServiceBootloaderTask');
    }

    // Return promise for configuring the ApiService
    execute(): Promise<any> {
        const bootConfiguration: any = this.bootConfig.getConfig();

        if (bootConfiguration === null || bootConfiguration === undefined) {
            return Promise.reject(
                '> ApiServiceBootloaderTask: No boot configuration found in boot config task.'
            );
        }
        if (!bootConfiguration.api) {
            return Promise.reject(
                '> ApiServiceBootloaderTask: No ApiService configuration found within boot configuration.'
            );
        }
        if (!this.apiEndpointsService) {
            return Promise.reject(
                '> ApiServiceBootloaderTask: No ApiService provided to task.'
            );
        }

        const parsedEndpoints = ApiEndpointParser.parse(bootConfiguration.api, bootConfiguration.apiServicesConfig);
       this.apiEndpointsService.setEndpoints(parsedEndpoints);

        return Promise.resolve(parsedEndpoints);
    }
}
