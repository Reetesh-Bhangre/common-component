import { EventEmitter, Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ILocalizationConfig } from '../boot-loader/tasks/boot-config-bootloader-task';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public defaultLang = 'en';
  public currentLang: string = this.defaultLang;

  /** An EventEmitter to listen to language change events. A LangChangeEvent is an object with the properties lang: string. */
  public onLangChange = new EventEmitter<any>();

  constructor(public translate: TranslocoService) {
    this.translate.langChanges$.subscribe((activeLocale) => {
      this.currentLang = activeLocale;
      this.onLangChange.next(activeLocale);
    });
  }

  /** Gets the available languages. */
  public getAvailableLangs(){
    return this.translate.getAvailableLangs();
  }

  /** Changes the language currently used */
  public setCurrentLang(lang: string) {
    return this.translate.setActiveLang(lang);
  }

  public setConfiguration(config: ILocalizationConfig){
     if(config){
        if(config.availableLangs){
          this.translate.setAvailableLangs(config.availableLangs);
        }
        if(config.defaultLang){
          this.translate.setDefaultLang(config.defaultLang);
          this.translate.setActiveLang(config.defaultLang);
        }
        if(config.fallbackLang){
          this.translate.setFallbackLangForMissingTranslation({ fallbackLang: config.fallbackLang });
        }
     }
  }

  public getTranslationForKey(key: string): string{
    return this.translate.translate(key);
  }

  public ngOnDestroy() {
    this.onLangChange.complete();
  }
}