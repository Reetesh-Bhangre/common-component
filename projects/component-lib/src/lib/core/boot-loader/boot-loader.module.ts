import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

import {
    BOOTLOADER_TASK_CONFIG,
    ITaskConfiguration,
    BootloaderService
} from './boot-loader.service';

//  A function that allows the BootloaderService to act as an
//  APP_INITIALIZER for an angular web application
export function bootloaderAppInitializer(
    bootloader: BootloaderService
): () => Promise<any> {
    const result = () => {
        return bootloader.onAppInitCompleted;
    };
    return result;
}


@NgModule({
    declarations: [],
    imports: [
    ],
    providers: []
})
export class BootloaderModule {
    //  Static method that will configure and return the providers needed to wire
    //  the selected bootloader functionality into an application.
    static initBootloaderService(
        config: {
            tasks?: ITaskConfiguration[];
            providers?: any[];
        }
    ): ModuleWithProviders<BootloaderModule> {
        //  Return a module with providers with the bootloader service,
        //  all of the providers needed to configure and run the service,
        //  and an App Initializer to cause the app initialization to wait
        return {
            ngModule: BootloaderModule,
            providers: [
                ...config.providers,
                {
                    provide: APP_INITIALIZER,
                    useFactory: bootloaderAppInitializer,
                    multi: true,
                    deps: [BootloaderService]
                },
                {
                    provide: BOOTLOADER_TASK_CONFIG,
                    useValue: config.tasks
                },
                BootloaderService
            ]
        };
    }
}
