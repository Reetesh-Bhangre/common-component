import { Injectable, Injector } from '@angular/core';

import { AuthenticationService } from '../../../authentication/authentication.service';
import { BaseBootloaderTask } from '../base-bootloader-task';
import {
    BootConfigBootloaderTask,
    IBootConfig
} from '../boot-config-bootloader-task';

@Injectable()
export class AuthenticateBootloaderTask extends BaseBootloaderTask {
    // TODO: Add type for auth config
    private authConfig: any;

    constructor(
        private bootConfig: BootConfigBootloaderTask,
        private injector: Injector
    ) {
        super('AuthenticateBootloaderTask');
    }

    // Return promise for loading config from configPath
    execute(): Promise<any> {
        const bootConfiguration: IBootConfig = this.bootConfig.getConfig();
        const authService = this.injector.get(AuthenticationService);

        if (bootConfiguration === null || bootConfiguration === undefined) {
            return Promise.reject(
                '> AuthenticateBootloaderTask: No boot configuration passed into task.'
            );
        }

        if (
            bootConfiguration.authentication === null ||
            bootConfiguration.authentication === undefined
        ) {
            return Promise.reject(
                '> AuthenticateBootloaderTask: Authentication configuration not found in boot-config file.'
            );
        }

        this.authConfig = bootConfiguration.authentication;

        //  Set auth config on auth service
         authService.setConfiguration(this.authConfig);

         return authService.init().then((isInitialized: any) => {
              return  Promise.resolve(isInitialized);
         })
    }
}
