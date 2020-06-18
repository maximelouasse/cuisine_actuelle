import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(
    private HttpClient: HttpClient,
  ) { }

  // CRUD method: read all items
  public readAllItems(): Promise<any> {
    return this.HttpClient.get(`${environment.apiUrl}/recipe`).toPromise()
      .then(data => this.getData(data))
      .catch(this.handleError);
  };

  // CRUD method: read all items
  public readOneItem(recipeId): Promise<any> {
    return this.HttpClient.get(`${environment.apiUrl}/recipe/${recipeId}`).toPromise()
      .then(data => this.getData(data))
      .catch(this.handleError);
  };

  /*
  Methods to get API responses
  */

  // Get the API response
  private getData = (apiResponse: any) => {
    return apiResponse || {};
  };
  //

  // Get the API error
  private handleError = (apiError: any) => Promise.reject(apiError.error);
  //
}
