import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../environments/environment";
import { ObservablesService } from "../observable/observable.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private HttpClient: HttpClient,
    private ObservablesService: ObservablesService
  ) { }

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

  // CRUD method: read all items
  public readAllItems(): Promise<any> {
    return this.HttpClient.get(`${environment.apiUrl}/recipe`)
      .toPromise()
      .then(data => this.getData(data, 'recipe'))
      .catch(this.handleError);
  };

  // Get Filtered Recipe
  public filterRecipe(data: any): Promise<any> {
    return this.HttpClient.post(`${environment.apiUrl}/recipe/`, data)
      .toPromise()
      .then(data => this.getData(data, 'recipe'))
      .catch(this.handleError);
  }

  // CRUD method: read all items
  public readOneItem(recipeId): Promise<any> {
    return this.HttpClient.get(`${environment.apiUrl}/recipe/${recipeId}`)
      .toPromise()
      .then(data => this.getData(data))
      .catch(this.handleError);
  };

  public getListFilter(type): Promise<any> {
    return this.HttpClient.get(`${environment.apiUrl}/recipe/filter/${type}`, this.setHeaderRequest())
      .toPromise()
      .then(data => this.getData(data))
      .catch(this.handleError);
  }

  public search(queryString: String) {
    return this.HttpClient.post(`${environment.apiUrl}/recipe/`, { filters: { ingredients: [queryString] } })
      .toPromise()
      .then(data => this.getData(data, 'recipe'))
      .catch(this.handleError);
  }

  /*
  Methods to get API responses
  */

  // Get the API response
  private getData = (apiResponse: any, endpoint = "") => {
    console.log(apiResponse);
    // Switch endpoint to set observable value
    switch(endpoint) {
      case 'recipe':
        this.ObservablesService.setObservableData('recipe', apiResponse.data);
      break
    }

    return apiResponse || {};
  };
  //

  // Get the API error
  private handleError = (apiError: any) => Promise.reject(apiError.error);
  //
}
