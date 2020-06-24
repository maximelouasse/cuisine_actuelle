import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl  } from '@angular/forms';

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
  public resultsSearch: any[] = [];
  public queryField: FormControl = new FormControl();
  public listQueryField: any[] = [];
  public displaySearchList: Boolean = false;

  public selectedFilterType: any[] = [];
  public selectedFilterSeason: any[] = [];

  /**
   * Methods
   */
    public convertSecondToMinute = (second: number) => {
      return Math.floor(second / 60);
    }

    public isMultiple = (value, multiple) => {
      return Number(value) % multiple;
    }

    public onBlur = () => {
      //this.displaySearchList = false;
    }

    public onFocus = () => {
      //this.displaySearchList = true;
    }

    public changeFilterType = (event) => {
      let value = event.target.getAttribute('data-value-filter');
      let index = this.selectedFilterType.indexOf(value);

      if(index !== -1) {
        this.selectedFilterType.splice(index, 1);
      } else {
        this.selectedFilterType.push(value);
      }
    }

    public changeFilterSeason = (event) => {
      let value = event.target.getAttribute('data-value-filter');
      let index = this.selectedFilterSeason.indexOf(value);

      if(index !== -1) {
        this.selectedFilterSeason.splice(index, 1);
      } else {
        this.selectedFilterSeason.push(value);
      }
    }

    public filterIsSelected = (filter: String, value: String) => {
      if(filter == "type") {
        if(this.selectedFilterType.indexOf(value) !== -1) {
          return true;
        } else {
          return false;
        }
      } else if(filter == "season") {
        if(this.selectedFilterSeason.indexOf(value) !== -1) {
          return true;
        } else {
          return false;
        }
      }
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

      this.queryField.valueChanges
        .subscribe(queryField => {
          //this.listQueryField.push(queryField);
          this.RecipeService.search(queryField)
            .then(response => {
              if(queryField == "") {
                this.resultsSearch = null;
                this.displaySearchList = false;
              } else {
                this.resultsSearch = response.data;
                this.displaySearchList = true;
              }
            })
          }
        );

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
