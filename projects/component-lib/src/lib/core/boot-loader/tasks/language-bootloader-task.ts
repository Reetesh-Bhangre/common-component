import { Injectable, Injector } from "@angular/core";
import { AuthenticationService } from "../../authentication/authentication.service";
import { LanguageService } from "../../language/language.service";
import { BaseBootloaderTask } from "./base-bootloader-task";
import { BootConfigBootloaderTask, IBootConfig } from "./boot-config-bootloader-task";

@Injectable()
export class LanguageBootloaderTask extends BaseBootloaderTask {
    constructor(
        private bootConfig: BootConfigBootloaderTask,
        private languageService: LanguageService,
        private injector: Injector
    ) {
        super('LanguageBootloaderTask');
    }

    // Return promise for configuring the ApiService
    async execute(): Promise<any> {
        const bootConfiguration: IBootConfig = this.bootConfig.getConfig();
        if (bootConfiguration === null || bootConfiguration === undefined) {
            return Promise.reject(
                '> LanguageBootloaderTask: No boot configuration found in boot config task.'
            );
        }
        if (!bootConfiguration.localization) {
            return Promise.reject(
                '> LanguageBootloaderTask: No localization configuration found within boot configuration.'
            );
        }
        const authService = this.injector.get(AuthenticationService);
        const userProfile = await authService.loadUserProfile();
        this.languageService.setConfiguration(bootConfiguration.localization);
        // TODO: Change once final flow added for fetching language configuration as per logged in client
        if(userProfile.attributes && userProfile.attributes.Language && userProfile.attributes.Language[0]){
            this.languageService.setCurrentLang(userProfile.attributes.Language[0]);
        }
        return Promise.resolve(bootConfiguration.localization);
    }
}