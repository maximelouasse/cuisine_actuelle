import { Component, OnInit } from '@angular/core';

import { RecipeService } from "../../services/recipes/recipe.service";

@Component({
  selector: 'app-list-recipe-page',
  templateUrl: './list-recipe-page.component.html',
  styles: [
  ]
})
export class ListRecipePageComponent implements OnInit {

  constructor(
    private RecipeService: RecipeService
  ) { }

  public allRecipe: any;

  ngOnInit(): void {
    this.RecipeService.readAllItems()
      .then(apiResponse => {
        this.allRecipe = apiResponse.data;
      })
      .catch(error => {
        console.log('ERROR request', error);
      });
  }

}
