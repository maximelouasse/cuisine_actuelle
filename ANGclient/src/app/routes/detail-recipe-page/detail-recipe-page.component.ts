import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RecipeService } from "../../services/recipes/recipe.service";

@Component({
  selector: 'app-detail-recipe-page',
  templateUrl: './detail-recipe-page.component.html',
  styles: [
  ]
})
export class DetailRecipePageComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private RecipeService: RecipeService,
    private _location: Location
  ) { }

  public recipeDetail: any;
  public yield: number;
  public initialYield: number;

  /**
   * Methods
   */
  public convertSecondToMinute = (second: number) => {
    return Math.floor(second / 60);
  }

  public getStep = (key: any) => {
    return Math.floor(key) + 1;
  }

  public changePerson = (type: String) => {
    if (type === "substract")
      this.yield--;
    else if (type === "add")
      this.yield++;
  }

  public calc = (quantity) => {
    if( quantity != null)
      return Math.round( (this.yield * parseFloat(quantity.replace(/,/g, '.')) / this.initialYield) * 100) / 100;
  }
  //

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.RecipeService.readOneItem(params.id)
        .then(apiResponse => {
          this.recipeDetail = apiResponse.data;
          this.yield = this.recipeDetail.yield;
          this.initialYield = this.recipeDetail.yield;
        })
        .catch(error => {
          console.log('ERROR request', error);
        });
    });
  }

  public backClicked = () => {
    this._location.back();
  }

}
