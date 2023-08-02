import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import {
    BaseBootloaderTask
} from '../tasks/base-bootloader-task';

//
//  Simple service wrapper that extends BaseBootloaderTask in order to load
//  the boot configuration file for use as a bootloader task.
//

export interface ILocalizationConfig {
    availableLangs?: string[] | { id: string, label: string} [];
    defaultLang?: string;
    translationLoaderConfig?: any;
    fallbackLang?: string;
}

export interface IBootConfig {
    authentication?: any;
    api?: any;
    localization?: ILocalizationConfig
}

@Injectable()
export class BootConfigBootloaderTask extends BaseBootloaderTask {
    public configPath = 'assets/boot-config.json';
    private config!: IBootConfig;
    private enviroment: any;

    constructor(private http: HttpClient, @Inject('environment') environment:any ) {
        super('BootConfigBootloaderTask');
        this.enviroment = environment;
    }

    public getConfig(): IBootConfig {
        return this.config;
    }

    // Return promise for loading config from configPath
    execute(): Promise<any> {
        return new Promise((resolve, reject) => {
            const configPath = this.configPath;

            this.http.get(configPath).subscribe(
                (response) => {
                    this.config = response as IBootConfig;
                    this.config = Object.assign(this.enviroment, this.config);
                    resolve(response);
                },
                (err) => {
                    const msg = `Could not load boot configuration file '${configPath}', error returned was: '${err}'`;
                    reject(msg);
                }
            );
        });
    }
}
