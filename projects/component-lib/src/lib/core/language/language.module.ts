import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TRANSLOCO_CONFIG, TRANSLOCO_LOADER } from '@ngneat/transloco';
import { ApiHttpService } from '../../services/api-loader/api-http.service';
import { ApiEndpointsService } from '../../services/api-loader/api-endpoints.service';
import { LanguageService } from './language.service';
import { ILanguageHttpLoaderConfig, LanguageHttpLoader, languageTranslationLoaderConfig } from './language-http-loader.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  providers: [LanguageService]                                                                                                                                                                                                                                                                                                                       
})
export class LanguageModule {
  static initLanguageService(translocoConfig = { reRenderOnLangChange: true, missingHandler: {
    // It will use the first language set in the `fallbackLang` property
    useFallbackTranslation: true
  } }, translationLoaderConfig?: ILanguageHttpLoaderConfig
  ): ModuleWithProviders<LanguageModule> {
    return {
      ngModule: LanguageModule,
      providers: [
        {
          provide: TRANSLOCO_CONFIG,
          useValue: translocoConfig
        },
        {
          provide: languageTranslationLoaderConfig,
          useValue: translationLoaderConfig
        },
        {
          provide: TRANSLOCO_LOADER,
          useClass: LanguageHttpLoader,
          deps: [ApiHttpService, ApiEndpointsService, languageTranslationLoaderConfig]
        },
        ApiHttpService,
        ApiEndpointsService
      ]
    }
  }
}