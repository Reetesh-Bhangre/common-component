    # Localizations in KPI Applications

    <span>
        The KPI Language Module and Service provide internationalization (i18n) and
        localization functionality to KPI web applications, and can also be used to provide Common-language functionality.
        They do not provide translation functionality, but instead enable switching the static text strings used in components
        throughout an application to alternative translations of the same text based on the set language and locale.
    </span>
    <span>
        This functionality uses the <a href="https://ngneat.github.io/transloco/" target="_blank">[@ngneat/transloco] </a>
        library under the covers to provide localization functionality. The KPI Language Module use the **transloco library**,
        handling the initialization of the **transloco** services, etc, as well as loading of the language files.
    </span>
    <br>

    ## Web Application Usage

      When the localization is used in a web application, the `app.module.ts` imports `LanguageModule`, calling its *initLanguageService* static method:
      and imports `TranslocoModule` in web application.<br>
      _app.module.ts:_

    ```javascript
        @NgModule({
            declarations: . . .
            imports: [ LanguageModule.initLanguageService(), TranslocoModule],
            providers: . . .
    ```

    The `LanguageModule`'s `initLanguageService` method returns a `ModuleWithProviders` instance that contains an instance of the `LanguageService`:

_language.module.ts:_

    ```javascript
    export class LanguageModule {

        static initLanguageService( . . . ): ModuleWithProviders {
            . . .
            return {
                . . .
                providers: [
                    LanguageService,
    ```

    Although almost all components will [use the ***transloco*** pipe or directive] to add localization functionality,
    for more advanced usage, components may need to use the language service directly.
    These components should request the `LanguageService` class through dependency injection: <br>
    _sample.component.ts:_

    ```javascript
        import { LanguageService } from '@control-tower/component-lib';
        @Component({ . . . })
        export class SampleComponent {
            constructor( private languageService: LanguageService ) {
                . . .
    ```

    ## Converting Components for Localization
    ### General Approach
    The general approach for using localization in a component is:<br>
      - Any static display strings in component templates are replaced with references to language string id's piped to the ***transloco*** pipe.<br>
      - The display strings are then stored in JSON based language files created for each language supported, with the strings keyed by the language string ids.<br>
      - The Language Service loads the language text file for the current language.<br>
      - The ***transloco*** pipe then obtains the display string to use for the language string id from the Language Service and renders the string to the template.<br>

    ### Syntax to support Translation in templates:<br>
      1. ####Structural Directive:
        <span> Using a structural directive is the recommended approach. It's DRY and efficient, as it creates one subscription per template:<span> <br>
         _home.component.html_:

         ```javascript
         <ng-container *transloco="let t">
              <p>{{ t('title') }}</p>
              <comp [title]="t('title')"></comp>
          </ng-container>

         ```

      2. ####Pipe:
      The second option we have is to use the ***transloco*** pipe:<br>
      _home.component.html_:

      ```javascript
      <span>{{ 'home' | transloco }}</span>
      ```
      Use it with inputs:<br>
       _home.component.html_:

      ```javascript
      <span [attr.alt]="'hello' | transloco">Attribute</span>
      <span [title]="'hello' | transloco">Property</span>
      ```

      [Guide for adding translation support in template](https://ngneat.github.io/transloco/docs/translation-in-the-template)

    ## Application Configuration for Localization

      To configure an application to use the localization, call the *initLanguageService()* method fo the *LanguageModule* from the AppModule's imports array:<br>

      ```javascript
      @NgModule({
          declarations: [ . . . ]
          imports: [LanguageModule.initLanguageService()],
          providers: [ . . . ],
          bootstrap: [AppComponent]
      })
      export class AppModule {}
      ```

      This will use the default functionality of the `LanguageHttpLoader` to load the language file for the currently selected language. The default configuration of the `LanguageHttpLoader`
      is setup to load the files from the */assets/i18n/* directory at the root of the website,
      with the files being named using their [IETF Language Tag](https://en.wikipedia.org/wiki/IETF_language_tag),
      which creates a file path in the form:

      ``
          /assets/i18n/<language_tag>.json
      ``

      Where *<language_tag>* is the [IETF BCP 47 Language Tag](https://en.wikipedia.org/wiki/IETF_language_tag) for the language
      alone or for the language and region.

      ### LanguageModule - Configure Alternative Language File Path
      If the language files will be located in a different directory on the web server, the configuration for the alternative path can be passed to the `LanguageModule.initLanguageService` method.

      To pass an alternative path configuration, an object adhering to the `ILanguageHttpLoaderConfig` interface can be passed to the `LanguageModule.initLanguageService` method, when called in the module's import array.

      The `ILanguageHttpLoaderConfig` interface is defined in `language-http-loader.service.ts`:

      ```javascript
        interface ILanguageHttpLoaderConfig {
        //  Default prefix is '/assets/i18n/', pass '' to override
        prefix?: string;
        //  Default suffix is '.json', pass '' to override
        suffix?: string;
        //  If using an ApiHttpService serviceId to load, pass, otherwise skip
        //  If using serviceId, override prefix and suffix as needed
        serviceId?: string;
        options?: any;
        }
      ```

    For instance, to configure the module to load language files from the root web site path `/assets/language/`, pass a configuration object to the `initLanguageService` method like this:

    _app.module.ts:_

    ```javascript

    import { LanguageModule } from '@control-tower/component-lib';
        . . .
        @NgModule({
                imports: [
                    LanguageModule.initLanguageService(undefined, {
                        prefix: '/assets/language/',
                        suffix: '.json',
                        serviceId: '',
                        options: ''
                    })
                ],
        . . .
    ```

    ### Localization config
      Other localization config can be set at the time of app initialization through bootloader.  <br>

     _boot.config.json_

      ```javascript
       "localization": {
        "availableLangs": [
          { "id": "en", "label": "English" },
          { "id": "es", "label": "Spanish" },
          { "id": "en-us", "label": "English-us" }
        ],
        "defaultLang": "en",
        "fallbackLang": "en",
        "translationLoaderConfig": {
              "prefix": "/assets/i18n/",
              "suffix": ".json",
              "serviceId": "",
               "options": ""
            }
          }
      ```

    ## The Schema
    Name your translation files based on the BCP 47 specification of language tags and region codes. For an overview of how these language tags are constructed, see [Language tags in HTML and XML](https://www.w3.org/International/articles/language-tags/).

    You can find a list of code subtags in the [IANA Language Subtag Registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry). These subtags are primitives that you can combine to create file name prefixes for individual regions. Here are some examples<br>

    | LOCALIZATION FILE NAME | #CORRESPONDING REGIONAL LANGUAGE VARIANT   | #SUBTAGS USED    |
    | :--------------------: | :---------------------------------------:  | :--------------: |
    | en.json                | English (default file)                     | en (English)     |
    | en-US.json             | American English                           | en (English) + US (United States)   |

    For more examples of frequently-used codes, see [ISO 639-2 Codes for the Representation of Names of Languages](http://www.loc.gov/standards/iso639-2/php/code_list.php).

    ## Localization file structure
    The JSON translation files are structured as key-value pairs. Here is an example from `en.json` file:
     ``"welcome_back": "Welcome back, {name}"``

    - "welcome_back" - An arbitrary key name for a welcome message.
    - "Welcome back, {name}" - The value assigned for English-language.

    ### Translation keys: naming conventions and organizing
    1. Keys should be named in **snake_case**.
    2. The key name should not strictly follow the value it holds. Also, do not use translation key values as their names. Ultimately, if the value drastically changes you may need to update the key name accordingly to keep things in sync. The result of this means finding all usages of the key and updating it as well, which is tedious and can lead to errors.
    3. Group translation keys into namespaces:
        - Helps to avoid name clashes. e.g., the keys can be named order.save and profile.save.
        - Nesting adds visual separation of the keys which is quite useful. Normally, having 2-3 levels of nesting is enough in most cases
    4. Take advantage of a global namespace:<br>
        Certain keys that are being used in different parts of your application. Some common examples are keys like “Profile”, “Save”, “Next”, etc. You may group such keys under a special namespace called global (or general) and use them throughout the app. This way you won’t need to create dozens of duplicate entries that will be hard to deal with later.

       ```javascript
        {
            "global": {
                "ok": "Okay",
                "cancel": "Cancel",
                "next": "Next",
                "previous": "Previous"
            }
        }
       ```

    5. Avoid concatenating translations:<br>
       Sometimes developers favor taking different translations and concatenating them, thus creating new strings of text. For example,  two keys “agree” and “proceed” act as button text “agree and proceed”. To avoid duplication, it could be fetched and combined in the following way t('agree') + ' ' + t('proceed'). It would work but not good idea. Remember that certain languages may have different word orders, and simply combining words will produce a sentence that makes no sense or that sounds awkward.

      [Guide for naming translation keys](https://lokalise.com/blog/translation-keys-naming-and-organizing/).

    ## Multi-language vs Common-language

      Within the architecture, the term multi-language refers to altering the language and region of the display strings according to the user's application settings.
      This functionality also supports 'Common name' functionality, which can be generally thought of as customizations of common names and words for particular clients. This allows different clients to use alternative names for some of the common names used throughout the application.
      'Common name' functionality can be accomplished by taking the original language files and customizing the common names used to match the client's preferences, before translating the files into the desired languages. This would be a per-install activity carried out as part of the application deployment process for that client.

    ### LanguageService

      > class: **LanguageService**

      The `LanguageService` is an injectable service that configures the `@neat/transloco` `TranslocoService` and configures the default and current languages based on configuration sent at time of application startup.
      It also exposes the API that the application will use when needing more functionality than the provided by package.

      ### Properties and Methods of Language Service

      ##### Properties
      -   <i>defaultLang</i> - Default language configurable by default set to En.
      -   <i>currentLang</i> - The language currently used.
      -   <i>onLangChange<i> - An EventEmitter to listen to language change events. A LangChangeEvent is an object with the properties lang: string & translations: any (an object containing your translations).

      ##### Methods

      -   <i>setCurrentLang(lang: string): Observable</i> - Changes the language currently used
      -   <i>getTranslationForKey(key: string )</i> - Returns a value for a translation
      -   <i>getAvailableLangs()</i> - Returns the available languages.
      -   <i>getDefaultLang(): string</i>- Gets the default language setting.
