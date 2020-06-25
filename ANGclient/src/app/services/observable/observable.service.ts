/*
Imports
*/
  // Angular
  import { Injectable } from '@angular/core';
  import { BehaviorSubject } from 'rxjs';
//

/*
Definition and export
*/
  @Injectable({
    providedIn: 'root'
  })
  export class ObservablesService {

    constructor() {}

    // Init observable
    protected listRecipe: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    protected userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    // Set observable value
    public setObservableData = (type: string, data: any) => {
      switch(type) {
        case 'recipe':
          this.listRecipe.next(data);
          break;

        case 'user':
          this.userInfo.next(data);
          break;

        default:
          break;
      };
    };

    // Get observable value
    public getObservableData = (type: string) => {
      switch(type) {
        case 'recipe':
          return this.listRecipe;

        case 'user':
          return this.userInfo;

        default:
          break;
      };
    };
  }
//
