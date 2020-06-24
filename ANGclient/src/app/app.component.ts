/*
Imports
*/
// Angular
import { Component, Renderer2 } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

/*
Componant configuration
*/
@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
})
//

/*
Export
*/
export class AppComponent {
  previousUrl: string;

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.previousUrl) {
          //this.renderer.removeClass(document.body, this.previousUrl);
          this.renderer.setProperty(document.body, 'id', this.previousUrl);
        }
        let currentUrlSlug = event.url.slice(1);

        if(currentUrlSlug.includes('recipe')) {
          currentUrlSlug = 'detail-recipe';
          this.renderer.setProperty(document.body, 'id', currentUrlSlug);
        } else if(currentUrlSlug == "") {
          currentUrlSlug = 'list-recipe';
          this.renderer.setProperty(document.body, 'id', currentUrlSlug);
        } else {
          //this.renderer.addClass(document.body, currentUrlSlug);
          this.renderer.setProperty(document.body, 'id', currentUrlSlug);
        }
        this.previousUrl = currentUrlSlug;
      }
    });
  }
}
//
