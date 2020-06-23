import { Component, OnInit } from '@angular/core';

import { RecipeService } from "../../services/recipes/recipe.service";
import { ObservablesService } from "../../services/observable/observable.service";

@Component({
  selector: 'app-list-recipe-page',
  templateUrl: './list-recipe-page.component.html',
  styleUrls: []
})
export class ListRecipePageComponent implements OnInit {

  constructor(
    private RecipeService: RecipeService,
    private ObservablesService: ObservablesService
  ) { }

  public allRecipe: any;
  public listFilterEvent: any;
  public listFilterType: any;

  /**
   * Methods
   */
    public convertSecondToMinute = (second: number) => {
      return Math.floor(second / 60);
    }

    public isMultiple = (value, multiple) => {
      return Number(value) % multiple;
    }
  //

  ngOnInit(): void {
    this.RecipeService.getListFilter("event")
      .then(apiResponse => {
        this.listFilterEvent = apiResponse.data;
      })
      .catch(error => {
        console.log('ERRO request', error);
      })

    this.RecipeService.getListFilter("type")
      .then(apiResponse => {
        this.listFilterType = apiResponse.data;
      })
      .catch(error => {
        console.log('ERRO request', error);
      })

    this.RecipeService.readAllItems()
      .then(apiResponse => {
        this.ObservablesService.getObservableData('recipe').subscribe( recipeList => {
          this.allRecipe = recipeList;
        })
      })
      .catch(error => {
        console.log('ERROR request', error);
      });

      /*this.RecipeService.filterRecipe({
        'filters': {
          "ingredients": ["lait", "oeuf"],
          "type": "",
          "time": { "min_time": 1700, "max_time": 1800 },
          "event": "",
          "allergies": [],
          "not_ingredients": [],
          "level": "Facile",
          "preferences": [],
          "diet": ""
        }
      })
      .then(apiResponse => {
        this.ObservablesService.getObservableData('recipe').subscribe( recipeList => {
          this.allRecipe = recipeList;
        })
      })
      .catch(error => {
        console.log('ERROR request', error);
      });*/
  }

}
