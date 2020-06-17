/*
Imports
*/
  // Angular
  import { Component, OnInit } from '@angular/core';

/*
Componant configuration
*/
  @Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
      `
  })
//

/*
Export
*/
  export class AppComponent implements OnInit {

    constructor() {}

    ngOnInit() {}
  }
//
