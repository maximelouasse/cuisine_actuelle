/*
Imports
*/
    // Angular
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { HttpClientModule } from '@angular/common/http';

    // Router
    import { RouterModule } from "@angular/router"
    import { AppRouterModule } from "./app.router";

    // Inner
    import { AppComponent } from './app.component';
    import { ListRecipePageComponent } from './routes/list-recipe-page/list-recipe-page.component';
    import { DetailRecipePageComponent } from './routes/detail-recipe-page/detail-recipe-page.component';
    import { ProfilePageComponent } from './routes/profile-page/profile-page.component';

/*
Definition & export
*/
  @NgModule({
    declarations: [
      AppComponent,
      ListRecipePageComponent,
      DetailRecipePageComponent,
      ProfilePageComponent
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot( AppRouterModule, { onSameUrlNavigation: 'reload' } ),
      HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
//
