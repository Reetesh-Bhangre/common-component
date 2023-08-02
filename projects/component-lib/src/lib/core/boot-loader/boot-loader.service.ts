import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { BaseBootloaderTask } from './tasks/base-bootloader-task';

import { NoOpBootloaderTask } from './tasks/no-op-boot-task';

//
//  Primary service that acts as an APP_INITIALIZER to boot the application, used to
//  enforce authentication, load configuration, and perform other setup tasks before
//  the application itself is loaded and run.
//
//  Acts as a task runner to execute discrete tasks in a configured dependency tree,
//  ensuring that any required tasks are completed before starting their dependent tasks.
//  Once all tasks are completed successfully, the APP_INITIALIZER promise is fullfilled
//  and the application starts.
//
//  The tasks to be executed are configured and supplied through the Angular DI system
//  using the BaseBootloaderTask abstract class/interface.
//

//  Configuration object that can be passed to the
//  BootloaderService to set configuration parameters
export interface IBootloaderConfiguration {
    debug?: boolean;
    failOnMissingTask?: boolean;
}

//  Configuration object for a task to be used by the BootloaderService,
//  this is the interface to be passed into the service, it may be created
//  by BootloaderConfiguration based on the IBootloaderConfigurationTask
//  instances passed to BootloaderConfiguration. This instance is different
//  from the IResolvedTaskConfiguration below, as the later is used internally.
export interface ITaskConfiguration {
    taskId: string;
    useClass?: string;
    dependsOn?: string[];
    event?: string;
    //  Whether this task should be used to trigger
    //  the APP_INITIALIZED promise to resolve
    appInitializer?: boolean;
}

//  Interface for the internal BootloaderService configuration construct
interface IResolvedTaskConfiguration extends ITaskConfiguration {
    //  Reference to task instance that will be used for a config, this is
    //  added when task configs are resolved using the DI provided tasks
    instance?: BaseBootloaderTask;
}

export const BOOTLOADER_CONFIG = new InjectionToken<IBootloaderConfiguration>(
    'bootloader-config'
);
export const BOOTLOADER_TASK = new InjectionToken<BaseBootloaderTask>(
    'bootloader-task'
);
export const BOOTLOADER_TASK_CONFIG = new InjectionToken<ITaskConfiguration>(
    'bootloader-task-config'
);

export enum BOOTLOADER_STATUS {
    STARTING = 'starting',
    INITIALIZING = 'initializing',
    RUNNING = 'running',
    FAILED = 'failed',
    COMPLETED = 'completed'
}

@Injectable()
export class BootloaderService {
    //  A promise resolved once the boot process has started (meaning all tasks
    //  have been initialized and started, and are either executing or waiting
    //  for their dependencies to complete).  Will fail if any errors are returned
    //  during the initialization or start process.
    public onBootStarted: Promise<boolean>;

    //  A promise that will be used to complete the App Init part of the boot
    //  process, this will be wired to the APP_INITIALIZER provider in App.module.ts.
    //  When this promise resolves or rejects, the APP_INITIALIZER will fail or complete
    //  and the app will start or display an error. Thus promise will be resolved if all
    //  of the task configurations marked appInitialized:true have been resolved, or if
    //  the onBootCompleted resolves or rejects. This promise can be rejected if any
    //  task fails before it is resolved, but after it is resolved a failing task will
    //  have no effect.
    public onAppInitCompleted: Promise<unknown>;

    //  A promise that will be used to complete the overall boot process, this
    //  will resolve once all of the boot tasks are complete and fail if any of
    //  the boot tasks fail.  This is used to track the overall boot process,
    //  and the APP_INITIALIZER process can complete before and separately from
    //  this. If this fails and the onAppInitCompleted promise has not been
    //  resolved it will fail that promise as well.
    public onBootCompleted: Promise<unknown>;

    //  Observable that publishes the status of the boot process, used to update the
    //  status from events declared in the task config as those tasks are completed.
    //  This can be used to display status messages or log the progress.
    public status: Observable<BOOTLOADER_STATUS>;

    //  Subject used to set the status of the bootloader internally
    private statusSubject: BehaviorSubject<BOOTLOADER_STATUS> =
        new BehaviorSubject<BOOTLOADER_STATUS>(BOOTLOADER_STATUS.STARTING);

    //  Methods to complete or fail the APP_INIT process
    private completeAppInit!: (value: unknown) => unknown;
    private failAppInit!: (reason?: unknown) => void;

    //  Methods that can be used to complete or fail the boot process,
    //  calling one of the methods will resolve or reject the bootCompleted
    //  promise, and if not already completed it will fail the promise
    //  used for the APP_INITIALIZER.
    private completeBoot!: (value: unknown) => unknown;
    private failBoot!: (reason?: unknown) => void;

    private taskIdLookup!: {
        [key: string]: BaseBootloaderTask;
    };

    private taskClassLookup!: {
        [key: string]: BaseBootloaderTask;
    };

    //  Tasks that are used in the passed task configuration, used to determine
    //  if all tasks have completed, as there might be tasks injected through
    //  DI that were not used in the configuration
    private usedTasks!: BaseBootloaderTask[];

    private failOnMissingTask = true;

    //  Whether to log debugging messages, will be set based on the debug flag
    //  in the optional IBootloaderConfiguration object, which also enables
    //  the console logging through this.log.
    private debug = false;

    constructor(
        //  List of all bootloader tasks autowired into this service through DI
        @Inject(BOOTLOADER_TASK)
        private tasks: BaseBootloaderTask[],
        //  A mapping of task id to the configurations of the task, including any
        //  requirements of the task, used to create the dependency hierarchy and
        //  connect tasks to their requirements
        @Inject(BOOTLOADER_TASK_CONFIG)
        private taskConfigurations: IResolvedTaskConfiguration[],
        //  An optional configuration object for setting bootloader parameters
        @Inject(BOOTLOADER_CONFIG)
        @Optional()
        configuration: IBootloaderConfiguration
    ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let completeStart: (value: any) => any;
        let failStart: (reason?: unknown) => void;

        this.parseConfiguration(configuration);

        if (this.debug) {
            this.log(
                `> BootloaderService : created with ${
                    this.tasks.length
                } tasks: (${this.tasks.map(
                    (t) => `${t.id} : ${t.constructor.name}`
                )}) and configurations for tasks [${taskConfigurations.map(
                    (c) => c.taskId
                )}]`
            );
        }

        this.status = this.statusSubject.asObservable();

        this.onBootStarted = new Promise((resolve, reject) => {
            this.log(`Bootloader: boot process started`);
            completeStart = resolve;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            failStart = reject;
        });

        this.onAppInitCompleted = new Promise((resolve, reject) => {
            this.log(`Bootloader: application initialization complete`);
            this.completeAppInit = (value) => {
                this.log(`> BootloaderService : app-init process complete`);
                resolve(value);
            };
            this.failAppInit = (error) => {
                this.log(
                    `> BootloaderService : app-init failed with error: '${error}'`
                );
                reject(error);
            };
        });

        //  Fail app init if failBoot is called, then fail the boot promise.  The
        //  rejection will be ignored if app init already resolved...
        this.onBootCompleted = new Promise((resolve, reject) => {
            this.completeBoot = (value) => {
                this.log(`> BootloaderService : boot process complete`);
                this.statusSubject.next(BOOTLOADER_STATUS.COMPLETED);
                //  If app init hasn't been resolved, then complete now
                this.completeAppInit(value);
                resolve(value);
            };
            this.failBoot = (error) => {
                this.log(
                    `> BootloaderService : boot process failed with error: `,
                    error
                );
                //  If app init hasn't been resolved or failed, then fail now
                this.failAppInit(error);
                reject(error);
            };
        });

        this.log(`> BootloaderService : initializing tasks...`);

        //  Initialize tasks, catching any initialization errors, then if
        //  successful, start tasks, catching any start errors separately
        //  If all completes, complete the onBootStarted promise
        this.initializeTasks();

        this.log(
            `> BootloaderService : initializing tasks complete, starting tasks...`
        );

        //  If no errors during initialization, start the tasks, since this is
        //  an async operation, this will complete after the bootloader has
        //  been created, so track and react to it through a promise
        this.start()
            .then((value) => {
                this.log(`> BootloaderService : starting tasks complete`);
                this.statusSubject.next(BOOTLOADER_STATUS.RUNNING);
                completeStart(value);
            })
            .catch((error) => {
                // Always log critical error
                // tslint:disable-next-line: no-console
                console.log(
                    `Bootloader Service returned error while starting tasks: '${error}'`
                );
                throw new Error(error);
            });
    }

    //  Initializes the tasks, adding links between dependencies
    initializeTasks() {
        //  Promises from tasks that will trigger the onAppInitCompleted promise
        const onAppInitPromises: Promise<any>[] = [];

        this.statusSubject.next(BOOTLOADER_STATUS.INITIALIZING);

        //  Tasks that are used by current task config
        this.usedTasks = [];

        //  Create lookups of the tasks provided through DI to allow
        //  tasks to be mapped to task configs
        this.createTaskLookups(this.tasks);

        //  Resolve which task provided through DI should be used for each config
        this.resolveTasks(this.taskConfigurations);

        //  Wire together the tasks with their requirements by stepping through the tasks
        //  configurations and passing them the other tasks that they depend on, wiring
        //  in complete and error handlers for each
        const configLen = this.taskConfigurations.length;
        for (let i = 0; i < configLen; i++) {
            const config = this.taskConfigurations[i];
            const task: BaseBootloaderTask = config.instance!;

            this.usedTasks.push(task);

            //  Build an array of task dependencies instances using the task
            //  lookup and pass the dependencies to the task
            if (config.dependsOn && config.dependsOn.length > 0) {
                this.log(
                    `> BootloaderService : task '${
                        config.taskId
                    }' depends on ${config.dependsOn.map((t) => `'${t}'`)}`
                );
                task.dependsOn(
                    this.mapTaskDependencies(config, this.taskIdLookup)
                );
            }

            if (config.appInitializer) {
                this.log(
                    `> BootloaderService : app initialization event chained to task '${config.taskId}'`
                );
                onAppInitPromises.push(task.onCompleted);
            }

            //  Listen for any errors returned from tasks and fail the boot
            //  process if any of the bootloader tasks fail
            task.onCompleted
                .then((value: any) => {
                    this.log(`Bootloader: boot task ${task.id} complete`);
                    return value;
                })
                .catch((error) => {
                    const msg = `Bootloader task ${
                        config.taskId
                    } failed with: '${
                        typeof error === 'string' ? error : error.toString()
                    }'`;
                    this.log(`> BootloaderService : Error : ${msg}`);
                    this.statusSubject.next(BOOTLOADER_STATUS.FAILED);
                    this.statusSubject.error(msg);
                    this.failBoot(msg);
                });
        }

        //  Wire up promises for app_init
        if (onAppInitPromises.length > 0) {
            Promise.all(onAppInitPromises)
                .then(this.completeAppInit.bind(this))
                .catch(this.failAppInit.bind(this));
        }
    }

    //  Starts running any tasks that have no dependencies
    start(): Promise<boolean> {
        //  Start all tasks that are being used by the current config
        const baseTaskPromises = this.usedTasks.map((task) => task.start());

        Promise.all(baseTaskPromises)
            .then(this.completeBoot)
            .catch(this.failBoot);

        return Promise.resolve(true);
    }

    private parseConfiguration(configuration: IBootloaderConfiguration) {
        if (configuration) {
            if (configuration.debug === true) {
                this.debug = true;
                //  If debug is set to true, replace no-op log method
                //  with a method that will log to console.log
                this.log = (...msg) => {
                    //  Disabling warning for optional logging to console
                    //  tslint:disable-next-line:no-console
                    console.log(...msg);
                };
                this.log('> BootloaderService : logging enabled');
            }
            if (configuration.failOnMissingTask !== undefined) {
                this.failOnMissingTask = !!configuration.failOnMissingTask;
                this.log(
                    `> BootloaderService : failOnMissingTask set to ${this.failOnMissingTask}`
                );
            }
        }
    }

    //  Step through the bootloader tasks that were provided through DI, create lookups
    //  for the task id property and the task class, to be used to map the task
    //  configurations to a task instance provided through DI
    private createTaskLookups(tasks: BaseBootloaderTask[]) {
        this.taskIdLookup = Object.create(null);
        this.taskClassLookup = Object.create(null);

        //  Create lookup from both the bootloader task id property and the
        //  task class name, ensuring both the id and class name are unique
        const taskLen = tasks.length;
        for (let i = 0; i < taskLen; i++) {
            const id = tasks[i].id;
            const className = tasks[i].constructor.name;

            this.log(
                `Adding task id='${id}', class name='${className}' to lookup...`
            );

            //  If a unique id is given, map to the id
            if (id !== className) {
                if (this.taskIdLookup[id]) {
                    throw new Error(`Duplicate bootloader task id '${id}'`);
                }
                this.taskIdLookup[id] = tasks[i];
            } else {
                //  A unique id is not given, map to the class name
                if (this.taskClassLookup[className]) {
                    throw new Error(
                        `Duplicate bootloader task class provided '${className}', there can only be one task provided for a particular task class, use the id property of the task to differentiate`
                    );
                }
                this.taskClassLookup[className] = tasks[i];
            }
        }
    }

    //  Resolve which DI provided task should be used for each task configuration, checking the taskId
    //  property from the task config first, if not fall back to the useClass property. This allows
    //  a default task (mapped by useClass) from BootloaderConfiguration to be overridden by a
    //  custom task supplied by the web app with the same id as the task config taskId property.
    private resolveTasks(taskConfigs: IResolvedTaskConfiguration[]) {
        const configLen = taskConfigs.length;
        for (let i = 0; i < configLen; i++) {
            const config = taskConfigs[i];
            const taskId: string = config.taskId;
            const useClass: string = config.useClass!;

            if (!this.taskIdLookup[taskId] && !this.taskClassLookup[useClass]) {
                if (this.failOnMissingTask) {
                    throw new Error(
                        `No bootloader task instance with id='${taskId}' or className='${useClass}' was provided to the BootloaderService for the configured task '${taskId}'.`
                    );
                } else {
                    this.log(
                        `> BootloaderService : No bootloader task with id='${taskId}' or className='${useClass}' was provided to the BootloaderService, using the no-op task.  This will cause the step '${taskId}' to be effectively skipped.`
                    );
                    this.taskIdLookup[taskId] = new NoOpBootloaderTask(taskId);
                }
            } else if (!this.taskIdLookup[taskId]) {
                this.taskIdLookup[taskId] = this.taskClassLookup[useClass];
            }

            config.instance = this.taskIdLookup[taskId];

            this.log(
                `> BootloaderService : Using ${config.instance.constructor.name} for bootloader task ${taskId}`
            );
        }
    }

    private mapTaskDependencies(
        taskConfig: IResolvedTaskConfiguration,
        taskLookup: {
            [key: string]: BaseBootloaderTask;
        }
    ) {
        const taskId = taskConfig.taskId;

        return taskConfig?.dependsOn?.map((requirement) => {
            if (taskLookup[requirement]) {
                return taskLookup[requirement];
            }
            if (this.failOnMissingTask) {
                throw new Error(
                    `Bootloader task '${requirement}' is a requirement for '${taskId}' but was not created and added to the bootloader service`
                );
            }

            this.log(
                `Bootloader Warning: Task '${requirement}' required by '${taskId}' was not created and added to the bootloader service, using no-op task instead`
            );

            //  Add auto-completing task to ignore the
            //  missing task and continue to have things work?
            return new NoOpBootloaderTask(requirement);
        });
    }

    //  Create a logging method that is a no-op.  If debug is set to
    //  true, replace this with a call to console log
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private log: (...args: any[]) => void = (...msg) => undefined;
}