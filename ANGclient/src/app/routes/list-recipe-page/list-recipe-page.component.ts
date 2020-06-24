import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';

import { RecipeService } from "../../services/recipes/recipe.service";
import { ObservablesService } from "../../services/observable/observable.service";

@Component({
  selector: 'app-list-recipe-page',
  templateUrl: './list-recipe-page.component.html',
  styleUrls: [],
})
export class ListRecipePageComponent implements OnInit {
  constructor(
    private RecipeService: RecipeService,
    private ObservablesService: ObservablesService
  ) {}

  public allRecipe: any;
  public listFilterEvent: any;
  public listFilterType: any;

  // Filter
  public seePopupFilter: Boolean;
  public filterForm: FormGroup;
  // Type de plat
  public selectedTypsDePlatNames: [string];
  public typeDePlatData: any = [
    {
      name: 'Apéretif',
      value: 'aperetif',
      img: 'assets/images/list-recipe/filter/aperetif.png',
    },
    {
      name: 'Entrée',
      value: 'entree',
      img: 'assets/images/list-recipe/filter/entree.png',
    },
    {
      name: 'Plat',
      value: 'plat',
      img: 'assets/images/list-recipe/filter/plat.png',
    },
    {
      name: 'Dessert',
      value: 'dessert',
      img: 'assets/images/list-recipe/filter/dessert.png',
    },
    {
      name: 'Boisson',
      value: 'boisson',
      img: 'assets/images/list-recipe/filter/boisson.png',
    },
    {
      name: 'Sauce',
      value: 'sauce',
      img: 'assets/images/list-recipe/filter/sauce.png',
    },
  ];
  // Temps de cuisson
  public selectedTempsDeCuissonNames: [string];
  public tempsCuissonData: any = [
    {
      name: '- 15 min',
      value: '15',
    },
    {
      name: '- 30 min',
      value: '30',
    },
    {
      name: '- 60 min',
      value: '60',
    },
  ];

  /**
   * Methods
   */
  public convertSecondToMinute = (second: number) => {
    return Math.floor(second / 60);
  };

  public isMultiple = (value, multiple) => {
    return Number(value) % multiple;
  };
  //

  ngOnInit(): void {
    this.RecipeService.getListFilter('event')
      .then((apiResponse) => {
        this.listFilterEvent = apiResponse.data;
      })
      .catch((error) => {
        console.log('ERRO request', error);
      });

    this.RecipeService.getListFilter('type')
      .then((apiResponse) => {
        this.listFilterType = apiResponse.data;
      })
      .catch((error) => {
        console.log('ERRO request', error);
      });

    this.RecipeService.readAllItems()
      .then((apiResponse) => {
        this.ObservablesService.getObservableData('recipe').subscribe(
          (recipeList) => {
            this.allRecipe = recipeList;
          }
        );
      })
      .catch((error) => {
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

    // Filter
    this.createFormInputs();
  }

  public createFormInputs = () => {
    this.filterForm = new FormGroup({
      tempsDeCuissonFormControl: this.createNewFormControl(this.tempsCuissonData),
      typeDePlatFormControl: this.createNewFormControl(this.typeDePlatData),
    });

    this.getSelectedInputs('typeDePlat');
    this.getSelectedInputs('tempsDeCuisson');
  };

  public createNewFormControl = (inputs) => {
    const arr = inputs.map((input) => {
      return new FormControl(input.selected || false);
    });
    return new FormArray(arr);
  };

  public getSelectedInputs = (whatInput) => {
    // Type de plat
    if (whatInput == 'typeDePlat') {
      this.selectedTypsDePlatNames = _.map(
        this.filterForm.controls.typeDePlatFormControl['controls'],
        (typeDePlat, i) => {
          return typeDePlat.value && this.typeDePlatData[i].value;
        }
      );
    }
    // Temps de cuisson
    if (whatInput == 'tempsDeCuisson') {
      this.selectedTempsDeCuissonNames = _.map(
        this.filterForm.controls.tempsDeCuissonFormControl['controls'],
        (tempsDeCuisson, i) => {
          return tempsDeCuisson.value && this.tempsCuissonData[i].value;
        }
      );
    }

    this.getSelectedInputName(whatInput);
  };

  public getSelectedInputName = (whatInput) => {
    // Type de plat
    if (whatInput == 'typeDePlat') {
      this.selectedTypsDePlatNames = _.filter(
        this.selectedTypsDePlatNames,
        function (typeDePlat) {
          if (typeDePlat !== false) {
            return typeDePlat;
          }
        }
      );
    }
    // Temps de cuisson
    if (whatInput == 'tempsDeCuisson') {
      this.selectedTempsDeCuissonNames = _.filter(
        this.selectedTempsDeCuissonNames,
        function (tempsDeCuisson) {
          if (tempsDeCuisson !== false) {
            return tempsDeCuisson;
          }
        }
      );
    }
    console.log(this.selectedTypsDePlatNames);
    console.log(this.selectedTempsDeCuissonNames);
  }

  public onSubmit = () => {
    console.log(this.selectedTypsDePlatNames);
    console.log(this.selectedTempsDeCuissonNames);
  };

  public checkPopupFilter = () => {
    if (this.seePopupFilter) {
      this.seePopupFilter = false;
    } else {
      this.seePopupFilter = true;
    }
  };
}
