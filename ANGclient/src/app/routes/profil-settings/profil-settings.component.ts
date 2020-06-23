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

  public adultesData = [
    {
      id: 1,
      value: 1,
      img: '/assets/images/profil-settings/foyer/adulte_unchecked.png',
      label: '',
    },
    {
      id: 2,
      value: 2,
      img: '/assets/images/profil-settings/foyer/adulte_unchecked.png',
      label: '',
    },
    {
      id: 3,
      value: 3,
      img: '/assets/images/profil-settings/foyer/adulte_unchecked.png',
      label: '',
    },
    {
      id: 4,
      value: 4,
      img: '/assets/images/profil-settings/foyer/adulte_unchecked.png',
      label: '',
    },
    {
      id: 5,
      value: 5,
      img: '/assets/images/profil-settings/foyer/adulte_unchecked.png',
      label: '',
    },
  ];

  public enfantsData = [
    {
      id: 1,
      value: 1,
      img: '/assets/images/profil-settings/foyer/enfant_unchecked.png',
      label: '',
    },
    {
      id: 2,
      value: 2,
      img: '/assets/images/profil-settings/foyer/enfant_unchecked.png',
      label: '',
    },
    {
      id: 3,
      value: 3,
      img: '/assets/images/profil-settings/foyer/enfant_unchecked.png',
      label: '',
    },
    {
      id: 4,
      value: 4,
      img: '/assets/images/profil-settings/foyer/enfant_unchecked.png',
      label: '',
    },
    {
      id: 5,
      value: 5,
      img: '/assets/images/profil-settings/foyer/enfant_unchecked.png',
      label: '',
    },
  ];

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
      id: 'fruit_de_mer',
      value: 'fruit_de_mer',
      label: 'Fruit de mer',
      img: '/assets/images/profil-settings/allergies/fruit_de_mer.png',
    },
  ];

  public regimeData = [
    {
      id: 'vegetarien',
      label: 'Végétarien',
      img: '/assets/images/profil-settings/regime/vegetarien.png',
    },
    {
      id: 'vegetalien',
      label: 'Végétalien',
      img: '/assets/images/profil-settings/regime/vegetalien.png',
    },
    {
      id: 'sans_porc',
      label: 'Sans porc',
      img: '/assets/images/profil-settings/regime/sans_porc.png',
    },
    {
      id: 'flexitarisme',
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

  public categorieData = [
    {
      id: 'pizza',
      label: 'Pizza',
      img: '/assets/images/profil-settings/categorie/pizza.png',
    },
    {
      id: 'healthy',
      label: 'Healthy',
      img: '/assets/images/profil-settings/categorie/healthy.png',
    },
    {
      id: 'asiatique',
      label: 'Asiatique',
      img: '/assets/images/profil-settings/categorie/asiatique.png',
    },
    {
      id: 'sushi',
      label: 'Sushi',
      img: '/assets/images/profil-settings/categorie/sushi.png',
    },
    {
      id: 'italien',
      label: 'Italien',
      img: '/assets/images/profil-settings/categorie/italien.png',
    },
    {
      id: 'indien',
      label: 'Indien',
      img: '/assets/images/profil-settings/categorie/indien.png',
    },
    {
      id: 'desserts',
      label: 'Desserts',
      img: '/assets/images/profil-settings/categorie/desserts.png',
    },
    {
      id: 'mexicain',
      label: 'Mexicain',
      img: '/assets/images/profil-settings/niveau/mexicain.png',
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
    { titleStep: '', description: '', data: {} },
  ];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.activeStepIndex = 5;
    this.masterForm = [];
    this.currentFormContent = [];
    this.formFields = [];
    this.stepItems = this.STEP_ITEMS;

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
    if (step == 'prev' && this.activeStepIndex == 0)
      this.router.navigate(['welcome']);

    this.activeStepIndex = step === 'prev' ? this.activeStepIndex - 1 : this.activeStepIndex + 1;

    this.setFormPreview();
  }

  setFormPreview(): void {
    this.formData = this.masterForm.reduce(
      (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
      {}
    );

    this.masterFormFields = Object.keys(this.formData);
  }

  onFormSubmit(): void {
    // emit aggregate form data to parent component, where we POST
    this.formSubmit.emit(this.formData);
  }

  trackByFn(index: number): number {
    return index;
  }
}
