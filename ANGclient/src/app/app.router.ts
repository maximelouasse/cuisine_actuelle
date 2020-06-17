/*
Imports
*/
    // Angular
    import { Routes } from '@angular/router';

    // Inner
    import { ListRecipePageComponent } from './routes/list-recipe-page/list-recipe-page.component';
    import { DetailRecipePageComponent } from './routes/detail-recipe-page/detail-recipe-page.component';
    import { ProfilePageComponent } from './routes/profile-page/profile-page.component';
//

/*
Export
*/
export const AppRouterModule: Routes = [
  {
    path: '',
    component: ListRecipePageComponent
  },
  {
    path: 'recipe/:id',
    component: DetailRecipePageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  }
];
//
