/*
Imports
*/
    // Angular
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { HttpClientModule } from '@angular/common/http';
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';

    // Router
    import { RouterModule } from "@angular/router"
    import { AppRouterModule } from "./app.router";

    // Inner
    import { AppComponent } from './app.component';
    import { ListRecipePageComponent } from './routes/list-recipe-page/list-recipe-page.component';
    import { DetailRecipePageComponent } from './routes/detail-recipe-page/detail-recipe-page.component';
    import { ProfilePageComponent } from './routes/profile-page/profile-page.component';
    import { HomeComponent } from './routes/home/home.component';
    import { HeaderComponent } from './shared/header/header.component';
    import { WelcomeComponent } from './routes/welcome/welcome.component';
    import { ProfilSettingsComponent } from './routes/profil-settings/profil-settings.component';

/*
Definition & export
*/
  @NgModule({
    declarations: [
      AppComponent,
      ListRecipePageComponent,
      DetailRecipePageComponent,
      ProfilePageComponent,
      HomeComponent,
      HeaderComponent,
      WelcomeComponent,
      ProfilSettingsComponent,
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(AppRouterModule, { onSameUrlNavigation: 'reload' }),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
  })
  export class AppModule {}
//
