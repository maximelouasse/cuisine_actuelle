import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    public seePopupLoginRegsiter = false;
    public formData: FormGroup;

    constructor( private FormBuilder: FormBuilder, private AuthService: AuthService, private Router: Router ) {}

    checkPopupLoginRegister () {
        if (this.seePopupLoginRegsiter) {
          this.seePopupLoginRegsiter = false;
        } else {
          this.seePopupLoginRegsiter = true;
        }
    }

    // Method to register user
    public registerUser( data: any ) {
      this.AuthService.register({ 'email': data.email })
      .then( registerData => {
        if(registerData.err === null) {
          this.seePopupLoginRegsiter = false;
          this.Router.navigateByUrl('/welcome');
          localStorage.setItem('user-email', registerData.data.email);
          localStorage.setItem('user-id', registerData.data._id);
        }
      })
      .catch( error => {
        console.log('ERROR request', error);
      });
    }

    public resetForm = () => {
        this.formData = this.FormBuilder.group({
          email: [ null, Validators.required/*, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")*/ ]
        });
    };


    ngOnInit(): void {
        this.resetForm();
    }
}
