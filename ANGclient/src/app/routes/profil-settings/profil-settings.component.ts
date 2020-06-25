import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ObservablesService } from '../../services/observable/observable.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-profil-settings',
  templateUrl: './profil-settings.component.html',
})
export class ProfilSettingsComponent implements OnInit {
  @Input() formContent: any;

  @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();

  activeStepIndex: number;
  currentFormContent: Array<any>;
  formData: any;
  formFields: Array<Array<string>>;
  masterFormFields: Array<string>;
  stepItems: Array<any>;
  masterForm: Array<FormGroup>;
  userInfo: any;

  public adultesData = [
    {
      id: 'adulte-1',
      value: 1,
      img: '/assets/images/profil-settings/foyer/adulte.png',
      label: '',
    },
    {
      id: 'adulte-2',
      value: 2,
      img: '/assets/images/profil-settings/foyer/adulte.png',
      label: '',
    },
    {
      id: 'adulte-3',
      value: 3,
      img: '/assets/images/profil-settings/foyer/adulte.png',
      label: '',
    },
    {
      id: 'adulte-4',
      value: 4,
      img: '/assets/images/profil-settings/foyer/adulte.png',
      label: '',
    },
    {
      id: 'adulte-5',
      value: 5,
      img: '/assets/images/profil-settings/foyer/adulte.png',
      label: '',
    },
  ];

  public enfantsData = [
    {
      id: 'enfant-1',
      value: 1,
      img: '/assets/images/profil-settings/foyer/enfant.png',
      label: '',
    },
    {
      id: 'enfant-2',
      value: 2,
      img: '/assets/images/profil-settings/foyer/enfant.png',
      label: '',
    },
    {
      id: 'enfant-3',
      value: 3,
      img: '/assets/images/profil-settings/foyer/enfant.png',
      label: '',
    },
    {
      id: 'enfant-4',
      value: 4,
      img: '/assets/images/profil-settings/foyer/enfant.png',
      label: '',
    },
    {
      id: 'enfant-5',
      value: 5,
      img: '/assets/images/profil-settings/foyer/enfant.png',
      label: '',
    },
  ];

  public allergiesCurrentData: Array<string>;
  public allergiesData = [
    {
      id: 'fruit_a_coque',
      value: 'fruit_a_coque',
      label: 'Fruit à coque',
      img: '/assets/images/profil-settings/allergies/fruit_a_coque.png',
    },
    {
      id: 'laitage',
      value: 'laitage',
      label: 'Laitage',
      img: '/assets/images/profil-settings/allergies/laitage.png',
    },
    {
      id: 'gluten',
      value: 'gluten',
      label: 'Gluten',
      img: '/assets/images/profil-settings/allergies/gluten.png',
    },
    {
      id: 'crustaces',
      value: 'crustaces',
      label: 'crustaces',
      img: '/assets/images/profil-settings/allergies/crustaces.png',
    },
    {
      id: 'oeufs',
      value: 'oeufs',
      label: 'oeufs',
      img: '/assets/images/profil-settings/allergies/oeufs.png',
    },
    {
      id: 'poissons',
      value: 'poissons',
      label: 'poissons',
      img: '/assets/images/profil-settings/allergies/poissons.png',
    },
    {
      id: 'arachides',
      value: 'arachides',
      label: 'arachides',
      img: '/assets/images/profil-settings/allergies/arachides.png',
    },
    {
      id: 'soja',
      value: 'soja',
      label: 'soja',
      img: '/assets/images/profil-settings/allergies/soja.png',
    },
    {
      id: 'celeri',
      value: 'celeri',
      label: 'celeri',
      img: '/assets/images/profil-settings/allergies/celeri.png',
    },
    {
      id: 'moutarde',
      value: 'moutarde',
      label: 'moutarde',
      img: '/assets/images/profil-settings/allergies/moutarde.png',
    },
    {
      id: 'sesame',
      value: 'sesame',
      label: 'sesame',
      img: '/assets/images/profil-settings/allergies/sesame.png',
    },
    {
      id: 'anhydride',
      value: 'anhydride',
      label: 'anhydride',
      img: '/assets/images/profil-settings/allergies/anhydride.png',
    },
    {
      id: 'lupin',
      value: 'lupin',
      label: 'lupin',
      img: '/assets/images/profil-settings/allergies/lupin.png',
    },
    {
      id: 'mollusques',
      value: 'mollusques',
      label: 'mollusques',
      img: '/assets/images/profil-settings/allergies/mollusques.png',
    },
  ];

  public regimeCurrentData: Array<string>;
  public regimeData = [
    {
      id: 'vegetarien',
      value: 'vegetarien',
      label: 'Végétarien',
      img: '/assets/images/profil-settings/regime/vegetarien.png',
    },
    {
      id: 'vegetalien',
      value: 'vegetalien',
      label: 'Végétalien',
      img: '/assets/images/profil-settings/regime/vegetalien.png',
    },
    {
      id: 'sans_porc',
      value: 'sans_porc',
      label: 'Sans porc',
      img: '/assets/images/profil-settings/regime/sans_porc.png',
    },
    {
      id: 'flexitarisme',
      value: 'flexitarisme',
      label: 'Flexitarisme',
      img: '/assets/images/profil-settings/regime/flexitarisme.png',
    },
  ];

  public niveauData = [
    {
      id: 1,
      value: 1,
      img: '/assets/images/profil-settings/niveau/toque.png',
      label: 'Débutant',
    },
    {
      id: 2,
      value: 2,
      img: '/assets/images/profil-settings/niveau/toque.png',
      label: 'Intermédiaire',
    },
    {
      id: 3,
      value: 3,
      img: '/assets/images/profil-settings/niveau/toque.png',
      label: 'Expert',
    },
  ];

  public categorieCurrentData: Array<string>;
  public categorieData = [
    {
      id: 'pizza',
      value: 'pizza',
      label: 'Pizza',
      img: '/assets/images/profil-settings/categorie/pizza.png',
    },
    {
      id: 'healthy',
      value: 'healthy',
      label: 'Healthy',
      img: '/assets/images/profil-settings/categorie/healthy.png',
    },
    {
      id: 'asiatique',
      value: 'asiatique',
      label: 'Asiatique',
      img: '/assets/images/profil-settings/categorie/asiatique.png',
    },
    {
      id: 'sushi',
      value: 'sushi',
      label: 'Sushi',
      img: '/assets/images/profil-settings/categorie/sushi.png',
    },
    {
      id: 'italien',
      value: 'italien',
      label: 'Italien',
      img: '/assets/images/profil-settings/categorie/italien.png',
    },
    {
      id: 'indien',
      value: 'indien',
      label: 'Indien',
      img: '/assets/images/profil-settings/categorie/indien.png',
    },
    {
      id: 'desserts',
      value: 'desserts',
      label: 'Desserts',
      img: '/assets/images/profil-settings/categorie/desserts.png',
    },
    {
      id: 'mexicain',
      value: 'mexicain',
      label: 'Mexicain',
      img: '/assets/images/profil-settings/categorie/mexicain.png',
    },
  ];

  public DATA_STEP_1 = {
    adultes: {
      type: 'radio',
      validations: {},
      errors: {},
      data: this.adultesData,
    },
    enfants: {
      type: 'radio',
      validations: {},
      errors: {},
      data: this.enfantsData,
    },
  };

  public DATA_STEP_2 = {
    allergies: {
      type: 'checkbox',
      validations: {},
      errors: {},
      data: this.allergiesData,
    },
  };

  public DATA_STEP_3 = {
    regime: {
      type: 'checkbox',
      validations: {},
      errors: {},
      data: this.regimeData,
    },
  };

  public DATA_STEP_4 = {
    ingredients: {
      type: 'text',
      validations: {},
      errors: {},
      placeholder: 'Recherchez des ingrédients',
    },
  };

  public DATA_STEP_5 = {
    niveau: {
      type: 'radio',
      validations: {},
      errors: {},
      data: this.niveauData,
    },
  };

  public DATA_STEP_6 = {
    categorieText: {
      type: 'text',
      validations: {},
      errors: {},
      placeholder: "Recherchez d'autres catégories",
    },
    categorieCheckbox: {
      type: 'checkbox',
      validations: {},
      errors: {},
      data: this.categorieData,
    },
  };

  public DATA_STEP_FINAL = {
    prenom: {
      type: 'text',
      validations: {},
      errors: {},
      placeholder: "Renseignez votre prénom",
    },
    email: {
      type: 'email',
      validations: {},
      errors: {},
      placeholder: "Resneignez votre adresse email",
      value: localStorage.getItem('user-email')
    }
  }

  public STEP_ITEMS = [
    {
      titleStep: 'Votre foyer',
      description: 'Pour combien de personnes faites-vous la cuisine ?',
      data: this.DATA_STEP_1,
    },
    {
      titleStep: 'Allergies',
      description: 'Avez-vous des allergies ?',
      data: this.DATA_STEP_2,
    },
    {
      titleStep: 'Régime Alimentaire',
      description: 'Avez-vous un régime particulier ?',
      data: this.DATA_STEP_3,
    },
    {
      titleStep: 'Ingrédients',
      description: "Y'a t'il, des aliments que vous n'aimez pas ?",
      data: this.DATA_STEP_4,
    },
    {
      titleStep: 'Niveau culinaire',
      description: "Quel est votre niveau d'expertise ?",
      data: this.DATA_STEP_5,
    },
    {
      titleStep: 'Préférence culinaire',
      description: 'Avez-vous des préférences culinaires ?',
      data: this.DATA_STEP_6,
    },
    { titleStep: '', description: '', data: this.DATA_STEP_FINAL },
  ];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private router: Router,
    private ObservablesService: ObservablesService,
    private AuthService: AuthService,
    private UserService: UserService) {}

  ngOnInit(): void {
    if(localStorage.getItem('user-email') != null) {
      this.AuthService.identity({email: localStorage.getItem('user-email')})
      .then( apiResponse => {
        if(apiResponse.err === null) {
          this.userInfo = apiResponse.data;
        }
      });
    }

    this.activeStepIndex = 0;
    this.masterForm = [];
    this.currentFormContent = [];
    this.formFields = [];
    this.stepItems = this.STEP_ITEMS;

    this.allergiesCurrentData = [];
    this.regimeCurrentData = [];
    this.categorieCurrentData = [];

    // NOTE: this can be cofigured to create a single form when needed
    this.stepItems.forEach((data, i) => {
      // holds name, validators, placeholder of all steps
      this.currentFormContent.push(this.stepItems[i]['data']);

      // holds string values for each field of all steps
      this.formFields.push(Object.keys(this.currentFormContent[i]));

      // holds all form groups
      this.masterForm.push(this.buildForm(this.currentFormContent[i]));
    });
  }

  // build separate FormGroups for each form
  buildForm(currentFormContent: any): FormGroup {
    const formDetails = Object.keys(currentFormContent).reduce((obj, key) => {
      obj[key] = ['', this.getValidators(currentFormContent[key])];

      return obj;
    }, {});

    return this._formBuilder.group(formDetails);
  }
  // get validator(s) for each field, if any
  getValidators(formField: any): Validators {
    const fieldValidators = Object.keys(formField.validations).map(
      (validator) => {
        if (validator === 'required') {
          return Validators[validator];
        } else {
          return Validators[validator](formField.validations[validator]);
        }
      }
    );

    return fieldValidators;
  }

  // get validation error messages per error, per field
  getValidationMessage(formIndex: number, formFieldName: string): string {
    const formErrors = this.masterForm[formIndex].get(formFieldName).errors;
    const errorMessages = this.currentFormContent[formIndex][formFieldName]
      .errors;
    const validationError = errorMessages[Object.keys(formErrors)[0]];

    return validationError;
  }

  goToStep(step: string): void {
    this.activeStepIndex = step === 'prev' ? this.activeStepIndex - 1 : this.activeStepIndex + 1;
    window.scrollTo(0, 0);

    this.setFormPreview();
  }

  stopForm():void {
    this.router.navigate(['welcome']);
  }

  getSelectedInputs(whatInput, value, isChecked): void {
    console.log(whatInput);
    if (whatInput == 'allergies') {
      if (isChecked) {
        this.allergiesCurrentData.push(value);
      } else {
        let index = this.allergiesCurrentData.indexOf(value);
        this.allergiesCurrentData.splice(index, 1);
      }
    }

    if (whatInput == 'regime') {
      if (isChecked) {
        this.regimeCurrentData.push(value);
      } else {
        let index = this.regimeCurrentData.indexOf(value);
        this.regimeCurrentData.splice(index, 1);
      }
    }

    if (whatInput == 'categorie') {
      if (isChecked) {
        this.categorieCurrentData.push(value);
      } else {
        let index = this.categorieCurrentData.indexOf(value);
        this.categorieCurrentData.splice(index, 1);
      }
    }

    console.log(this.regimeCurrentData);

  }

  setFormPreview(): void {

    this.formData = this.masterForm.reduce(
      (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
      {}
    );

    this.masterFormFields = Object.keys(this.formData);
  }

  onFormSubmit(): void {
    this.setFormPreview();
    console.log(this.formData);
    console.log(this.allergiesCurrentData);
    console.log(this.regimeCurrentData);
    console.log(this.categorieCurrentData);

    let sendData = {
      "userId": this.userInfo._id,
      "name": this.formData.prenom,
      "address": "",
      "postal_code": "",
      "house_composition": {"adult": this.formData.adultes, "child": this.formData.enfants},
      "allergy": this.allergiesCurrentData,
      "diet": this.regimeCurrentData,
      "not_ingredient": [],
      "cook_level": this.formData.niveau,
      "culinary_preference": []
    }

    console.log(sendData);
    this.UserService.saveUserInformation(sendData)
    .then( apiResponse => {
      if(apiResponse.err === null) {
        this.router.navigateByUrl('/');
      }
    })
  }

  trackByFn(index: number): number {
    return index;
  }
}
