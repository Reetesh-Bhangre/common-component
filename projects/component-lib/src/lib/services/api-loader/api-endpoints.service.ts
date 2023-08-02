// Angular Modules
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

//  Used to make sure all service url's end with a slash to
//  make prefixing them onto a path predictable
const endsWithSlash = /[\/|\\]{1,}$/;
//  Used to detect and remove a slash at the start of a path,
//  being prefixed by a service url
const startsWithSlash = /^[\/|\\]{1,}/;
//  Used to detect if a url string starts with a question mark,
//  indicating it only contains a query string
const startsWithQuestion = /^\?/;

//  Configuration for a single service endpoint
export interface IApiServiceEndpoint {
  id?: string;
  url?: string;
}

//  Injection token used to supply the endpoint configurationIApiServiceEndpointObject
//  that serves as input to the ApiService.
export const apiServicesEndpoints = new InjectionToken<any>(
  'apiServicesEndpoints'
);

/**
 * Interface for ApiService endpoint configuration
 */
export interface IApiServiceConfig {
  services?: IApiServiceEndpoint[];
  endPoints?: any;
}

@Injectable()
export class ApiEndpointsService {
  protected serviceLookup: any;

  constructor(
    @Optional()
    @Inject(apiServicesEndpoints)
    private readonly endpointConfig: IApiServiceConfig
  ) {
    if (this.endpointConfig) {
      this.setEndpoints(this.endpointConfig);
    }
  }

  /**
   * Fetch service URL based on serviceID
   * @param endPoint The Endpoint is a specific “point of entry” in an API @example /support
   * @returns
   */
  getEndpointUrl(endPoint?: string): string {
    let domain = '';
    if (endPoint) {
      if (this.serviceLookup[endPoint]) {
        domain = this.serviceLookup[endPoint].url;
      } else {
        console.warn(
          `ApiEndpointsService: Could not find endPoint id '${endPoint}'`
        );
      }
    }

    return domain || '';
  }

  /* #region URL CREATOR */
  /**
   * Create simple URL
   * @param action {string} url prefix
   * @param endPointUrl
   * @returns
   */
  public createUrl(action: string): string {
    const serviceUrl = this.getEndpointUrl(action);
    const requestUrl =
      startsWithQuestion.test(serviceUrl) || startsWithSlash.test(serviceUrl)
        ? serviceUrl.replace(endsWithSlash, '')
        : serviceUrl;
    return requestUrl;
  }

  /**
   * Create URL with QueryParams
   * @param action {string}
   * @param queryParams
   * @returns
   */
  public createUrlWithQueryParameters(
    action: string,
    queryParams: {} = {}
  ): string {
    const queryString = Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key as keyof typeof queryParams]}`)
      .join('&');
    const serviceUrl = this.getEndpointUrl(action);
    //  Remove any starting slash in the url/path string
    const path = queryString ? queryString.replace(startsWithSlash, '') : '';
    return `${serviceUrl.replace(endsWithSlash, '')}?${path}`;
  }

  public createUrlWithPathAndQueryVariables(
    action: string,
    queryParams: {} = {},
    pathVariables:{} = {}
  ): string {
    let serviceUrl = this.getEndpointUrl(action);
    const urlParts = serviceUrl.split('/');
    urlParts.forEach( part => {
      if(part.startsWith(':')){
        const pathVarValue = pathVariables[part.split(':')[1]];
        serviceUrl = serviceUrl.replace(part, encodeURIComponent(pathVarValue))
      }
    })
    if(Object.keys(queryParams).length > 0 ){
      const queryString = Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key as keyof typeof queryParams]}`)
      .join('&');
      const queryPath = queryString
      ? queryString.replace(startsWithSlash, '')
      : '';
      serviceUrl = `${
        serviceUrl
      }?${queryPath}`;
    }
    return serviceUrl;
  }

  // URL WITH QUERY PARAMS
  public createUrlWithQueryString(action: string, queryString: string): string {
    const serviceUrl = this.getEndpointUrl(action);
    //  Remove any starting slash in the url/path string
    const path = queryString ? queryString.replace(startsWithSlash, '') : '';
    const requestUrl = `${serviceUrl.replace(endsWithSlash, '')}?${path}`;
    return requestUrl;
  }

  public urlWithServiceId(url?: string, serviceId?: string) {
    // Fetch API URL by ServiceID and append it with endpoint URL. It will create complete API Request URL
    // Function will automatically identify if version of API available. If it is, then will append with the API URL
    const serviceUrl = this.getEndpointUrl(serviceId);
    //  Remove any starting slash in the url/path string
    const path = url ? url.replace(startsWithSlash, '') : '';
    //  If there is no path, the path is a query string (starts with a question mark) or
    //  already starts with a slash remove the trailing slash from the service url
    const requestUrl = `${
      !path || startsWithQuestion.test(path) || startsWithSlash.test(path)
        ? serviceUrl.replace(endsWithSlash, '')
        : serviceUrl
    }${path}`;
    return requestUrl;
  }
  /* #end region */

  setEndpoints(endpointConfig?: IApiServiceConfig) {
    if (
      endpointConfig &&
      Array.isArray(endpointConfig.services) &&
      endpointConfig.services.length
    ) {
      //  Add endpoints to the serviceLookup
      this.serviceLookup = endpointConfig?.services?.reduce(
        (runningLookup, team) => {
          runningLookup[team.id!] = team;
          return runningLookup;
        },
        {}
      );
    }
  }
}


  // /**
  //  * Create URL with Path variables
  //  * @param action {string}
  //  * @param pathVariables
  //  * @returns
  //  */
  // public createUrlWithPathVariables(
  //   action: string,
  //   pathVariables: any[] = []
  // ): string {
  //   let encodedPathVariablesUrl = '';
  //   // Push extra path variables
  //   for (const pathVariable of pathVariables) {
  //     if (pathVariable !== null) {
  //       encodedPathVariablesUrl += `/${encodeURIComponent(
  //         pathVariable.toString()
  //       )}`;
  //     }
  //   }
  //   const serviceUrl = this.getEndpointUrl(action);
  //   //  Remove any starting slash in the url/path string
  //   const path = encodedPathVariablesUrl
  //     ? encodedPathVariablesUrl.replace(startsWithSlash, '')
  //     : '';
  //   const requestUrl = `${
  //     !encodedPathVariablesUrl ||
  //     startsWithQuestion.test(path) ||
  //     startsWithSlash.test(path)
  //       ? serviceUrl.replace(endsWithSlash, '')
  //       : serviceUrl
  //   }${path}`;
  //   return requestUrl;
  // }

  
  // /**
  //  * Create URL with QueryParams
  //  * @param action {string}
  //  * @param queryParams
  //  * @param pathVariables
  //  * @returns
  //  */
  // public createUrlWithPathVarAndQueryParams(
  //   action: string,
  //   queryParams: {} = {},
  //   pathVariables: any[] = []
  // ): string {
  //   const serviceUrl = this.getEndpointUrl(action);

  //   let encodedPathVariablesUrl = '';
  //   // Push extra path variables
  //   for (const pathVariable of pathVariables) {
  //     if (pathVariable !== null) {
  //       encodedPathVariablesUrl += `/${encodeURIComponent(
  //         pathVariable.toString()
  //       )}`;
  //     }
  //   }
  //   //  Remove any starting slash in the url/path string
  //   const varPath = encodedPathVariablesUrl
  //     ? encodedPathVariablesUrl.replace(startsWithSlash, '')
  //     : '';

  //   const queryString = Object.keys(queryParams)
  //     .map(key => `${key}=${queryParams[key as keyof typeof queryParams]}`)
  //     .join('&');
  //   // const serviceUrl = this.getEndpointUrl(action);
  //   //  Remove any starting slash in the url/path string
  //   const queryPath = queryString
  //     ? queryString.replace(startsWithSlash, '')
  //     : '';

  //   const requestUrl = `${
  //     !encodedPathVariablesUrl ||
  //     startsWithQuestion.test(varPath) ||
  //     startsWithSlash.test(varPath)
  //       ? serviceUrl.replace(endsWithSlash, '')
  //       : serviceUrl
  //   }${varPath}?${queryPath}`;
  //   return requestUrl;
  // }
