import { HttpClient } from '@angular/common/http';

import { BaseBootloaderTask } from './tasks/base-bootloader-task';
import { BootConfigBootloaderTask } from './tasks/boot-config-bootloader-task';
import { BOOTLOADER_TASK } from './boot-loader.service';
import { AuthenticateBootloaderTask } from './tasks/authenticate-bootloader-task/authenticate-bootloader-task';
import { ApiEndpointsService } from '../../services/api-loader/api-endpoints.service';
import { ApiServiceBootloaderTask } from './tasks/boot-api-service-bootloader-task';
import { LanguageBootloaderTask } from './tasks/language-bootloader-task';

//  A configuration object used to capture a particular configuration of
//  bootloader tasks and to provide an easy method to pass a configurations
//  to the BootloaderModule in order to configure the boot process of a web app.
//  The configurations can define the set of tasks for the bootloader to execute at
//  application start and the providers that are needed to support the tasks and
//  boot process.
//
//  Specific configuration instances are captured as properties of
//  BootloaderConfiguration, allowing them to be passed to the
//  BootloaderModule like this:
//
//  @NgModule({
//      declarations: [AppComponent],
//      imports: [
//          . . .
//          BootloaderModule.initBootloaderService(
//              BootloaderConfiguration.BaseAndApi
//          )
//      ]
//
//  Which will cause BootloaderModule to load the tasks defined in the
//  configuration 'BaseAndApi', as well as instantiating the providers
//  required for the particular bootloader process.

export function taskProviderFactory(t: BaseBootloaderTask) {
  return t;
}

export const BootloaderConfiguration = {
  Default: {
    tasks: [
      {
        taskId: 'BootConfigBootloaderTask',
        useClass: 'BootConfigBootloaderTask',
      },
      {
        taskId: 'AuthenticateBootloaderTask',
        useClass: 'AuthenticateBootloaderTask',
        dependsOn: ['BootConfigBootloaderTask'],
      },
      {
        taskId: 'ApiServiceBootloaderTask',
        useClass: 'ApiServiceBootloaderTask',
        dependsOn: ['BootConfigBootloaderTask'],
      },
      {
        taskId: 'LanguageBootloaderTask',
        useClass: 'LanguageBootloaderTask',
        dependsOn: ['BootConfigBootloaderTask', 'AuthenticateBootloaderTask']
      }
    ],
    providers: [
      ApiEndpointsService,
      HttpClient,
      //  Wire in providers for the services that double as tasks,
      //  these services are able to be wired into other components
      //  or services as needed, while also serving as a boot-task
      BootConfigBootloaderTask,
      AuthenticateBootloaderTask,
      ApiServiceBootloaderTask,
      LanguageBootloaderTask,
      //  Also provide the services that double as tasks... as
      //  tasks... using the BOOTLOADER_TASK dependency tokens,
      //  The service instances provided above, are also provided
      //  as bootloader tasks to the bootloader service, this
      //  allows them to serve as both a service and a task
      {
        provide: BOOTLOADER_TASK,
        useFactory: taskProviderFactory,
        deps: [BootConfigBootloaderTask],
        multi: true,
      },
      {
        provide: BOOTLOADER_TASK,
        useFactory: taskProviderFactory,
        deps: [AuthenticateBootloaderTask],
        multi: true,
      },
      {
        provide: BOOTLOADER_TASK,
        useFactory: taskProviderFactory,
        deps: [ApiServiceBootloaderTask],
        multi: true,
      },
      {
        provide: BOOTLOADER_TASK,
        useFactory: taskProviderFactory,
        deps: [LanguageBootloaderTask],
        multi: true,
      },
      
    ],
  },
};
