import { InjectionToken } from '@angular/core';

import {
    IApiServiceConfig
} from './api-endpoints.service';


//  The input to the factory method is an extension of the
//  IApiServiceConfig interface
export interface IApiEndpointParserConfig extends IApiServiceConfig {
    /** Default host to prepend to any service
     * url that doesn't include a host*/ 
    defaultHost?: string;
}

//  Injection token for input to this parser
export const apiEndpointParserInput = new InjectionToken<any>(
    'apiEndpointParserInput'
);

//  Class to convert a list containing some absolute service endpoint paths (paths that
//  start with a slash and don't contain a host), into a list of endpoints with a fully
//  qualified domain name, by prepending them with a common baseHost url.  This allows a
//  set of partial endpoints to be easily converted to use a single host for each deployment
//  environment, after only changing the host name once in the configuration.
//
//  This class is intended to be used by the ApiServiceBootloaderTask from
//  the component-lib.  
//
//  This class will parse an IApiEndpointConfig into an endpoint list suitable for use
//  by the ApiService class.  Any absolute paths (paths that start with a slash)
//  will be prepended with the defaultHost if one is supplied.  Any endpoints with
//  a host will be ignored.
//
//  Converts an endpoint config like:
//
//  apiEndpointConfig = {
//      defaultHost: "https://service.host.com/",
//      services: [{
//          id: 'user.ratings.listService',
//          url: 'http://my-service1-backend.com',
//      }, {
//          id : 'user.list',
//          url : '/api/user/list/'
//      }
//      }]
//  }
//
//  into the following IApiServiceConfig configuration, suitable
//  for passing to the ApiService:
//
//      [ {
//          id : 'user.list',
//          url : 'https://service.host.com/api/user/list/'
//      }]
//
//  This class can be automatically wired into the bootloader using the
//  ApiServiceBootloaderTask from the component-lib.  This is the
//  recommended way to use this class.
//
//  If not using the bootloader it can be used by itself in an application
//  module or Storybook by wiring it as a provide in the story moduleMetaData.
//
//  The flow is:
//
//      apiEndpointParserInput (injection token containing the config with base host)
//          V
//      ApiEndpointParser.parse
//          V
//      apiServicesEndpoints (injection token with resolved service endpoints)
//          V
//      ApiEndPointService
//
//  To wire this class in to convert a set of endpoints using a baseHost, the
//  provider configuration would look something like:
//
//  //  Create or import the input to the parser:
//  const endpointParserConfig = { baseHost: ' . . . ', services : [ . . . ] }
//
//  .   .   .
//
//  providers: [
//      //  Wire provider that contains the input to the parser
//      {
//          provide: apiEndpointParserInput,
//          useValue: endpointParserConfig
//      },
//      //  Wire provider for the ApiEndpointParser, to parse the
//      //  input above into the output needed by the ApiService
//      {
//          provide: apiServicesEndpoints,
//          useFactory: ApiEndpointParser.parse,
//          deps: [apiEndpointParserInput]
//      },
//      //  Wire in the ApiService, which will have the output from the
//      //  parser injected through the apiServicesEndpoints injection token
//      ApiService
//  ]

const startsWithSlash = /^[\/|\\]{1,1}.*/;
// const endsWithSlash = /[\/|\\]{1,}$/;

export class ApiEndpointParser {
    
    //  Return the parsed endpoint list, with any absolute endpoint paths
    //  prepended with the default host (if one was supplied)
    static parse(apiConfig: IApiEndpointParserConfig, apiServicesConfig: any): any {
        if (
            apiConfig
            &&
            apiServicesConfig
        ) {
            const baseConfig = apiServicesConfig.services;
            const services = [];

            for (const serviceName in apiConfig.endPoints) {
                apiConfig.endPoints[serviceName].forEach(endpoint => {
                    const baseDetails = baseConfig[serviceName];
                   if ('url' in endpoint && 'id' in endpoint) {
                    if (endpoint && endpoint.url) {
                        //  If starts with slash, prepend the default
                        //  host, otherwise return the url as-is
                        if (startsWithSlash.test(endpoint.url)) {
                            endpoint.url = `${baseDetails.url}${endpoint.url}`;
                        }
                    }
                    services.push(endpoint)
                 }
               })
              }
             return { services };
        }
    }
}
