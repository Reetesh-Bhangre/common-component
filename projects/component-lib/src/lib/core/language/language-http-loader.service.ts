import { Inject, InjectionToken, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslocoLoader } from '@ngneat/transloco';
import { ApiEndpointsService } from '../../services/api-loader/api-endpoints.service';
import { ApiHttpService } from '../../services/api-loader/api-http.service';

//  An implementation of @transloco LanguageHttpLoader that can load language
//  files from a service id through the ApiService, or can fall back to simply
//  loading them from a directory on the server.  Can work with either HttpClient
//  or ApiHttpService.
export const languageTranslationLoaderConfig = new InjectionToken<
    ILanguageHttpLoaderConfig
>('translationLoaderConfig');

export interface ILanguageHttpLoaderConfig {
    //  Default prefix is '/assets/i18n/', pass '' to override
    prefix?: string;
    //  Default suffix is '.json', pass '' to override
    suffix?: string;
    //  If using an ApiHttpService serviceId to load, pass, otherwise skip
    //  If using serviceId, override prefix and suffix as needed
    serviceId?: string;
    options?: any;
}

//  Pass nothing for ILanguageHttpLoaderConfig constructor parameter to
//  load language files from the default server path: '/assets/i18n/<lang>.json'.
//  Pass alternative prefix to load from another directory, include a serviceId
//  to load them from a service locator id that is loaded into the ApiHttpService.
export class LanguageHttpLoader implements TranslocoLoader {
    public service: ApiHttpService;
    public prefix: string;
    public suffix: string;
    public serviceId: string;
    public options: any;

    constructor(
        apiService: ApiHttpService,
        private apiEndpointsService: ApiEndpointsService,
        @Inject(languageTranslationLoaderConfig)
        @Optional()
        config: ILanguageHttpLoaderConfig,
    ) {
        const { prefix, suffix, serviceId, options } = config;
        this.service = apiService as ApiHttpService;
        this.prefix = prefix || 'assets/i18n/';
        this.suffix = suffix || '.json';
        this.serviceId = serviceId;
        this.options = options;
    }

    /**
     * Gets the translations from the server
     */
    public getTranslation(lang: string): Observable<object> {
        const filename = `${this.prefix}${lang}${this.suffix}`;

        //  Call in a manner that will work with both HttpClient and ApiHttpService,
        //  if HttpClient is passed, this will fall back to HttpClient api, if
        //  ApiHttpService is provided and serviceId is passed, it will use those instead.
        return this.service.get(this.apiEndpointsService.urlWithServiceId(filename, this.serviceId));
    }
}
