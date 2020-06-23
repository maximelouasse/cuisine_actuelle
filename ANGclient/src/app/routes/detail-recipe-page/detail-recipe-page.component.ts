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

  public repiceDetail: any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.RecipeService.readOneItem(params.id)
        .then(apiResponse => {
          this.repiceDetail = apiResponse.data;
          //console.log(this.repiceDetail.medias);
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
