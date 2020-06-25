/*
Import
*/
  // Angular
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';

  // Inner
  import { environment } from "../../../environments/environment";
  import { ObservablesService } from "../observable/observable.service";
//

/*
Definition and export
*/
  @Injectable()
  export class AuthService {

    // Inject module(s) in the service
    constructor( private HttpClient: HttpClient, private ObservablesService: ObservablesService ){};

    /*
    Method to set header
    */
      private setHeaderRequest = () => {
        // Set header
        let myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');

        // Return header
        return { headers: myHeader };
      }
    //

    /*
    AUTH methods
    */
      // Register user
      public register(data: any): Promise<any> {
        // Launch request
        return this.HttpClient.post(`${environment.apiUrl}/auth/register`, data, this.setHeaderRequest())
          .toPromise()
          .then( data => this.getData(data, 'user'))
          .catch(this.handleError);
      }

      // Login user
      public login(data: any): Promise<any> {
        // Launch request
        return this.HttpClient.post(`${environment.apiUrl}/auth/login`, data, this.setHeaderRequest())
          .toPromise()
          .then( data => this.getData(data, 'user'))
          .catch(this.handleError);
      }

      // Get user identity
      public identity(data: any): Promise<any> {
        // Launch request
        return this.HttpClient.post(`${environment.apiUrl}/auth/me`, data, this.setHeaderRequest())
          .toPromise()
          .then( data => this.getData(data, 'user'))
          .catch(this.handleError);
      }
    //

    /*
    Methods to get API responses
    */
      // Get the API response
      private getData = (apiResponse: any, endpoint) => {
        // Switch endpoint to set observable value
        switch(endpoint) {
          case 'user':
            // Set user info observable value
            this.ObservablesService.setObservableData('user', apiResponse.data);
            break;

          default:
            break;
        };

        // Retun data anytime
        return apiResponse || {};
      };

      // Get the API error
      private handleError = (apiError: any) => Promise.reject(apiError.error);

    //
  };
//
