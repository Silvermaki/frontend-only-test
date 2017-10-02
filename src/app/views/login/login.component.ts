//Native imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

//Third party libraries imports
import { default as swal } from 'sweetalert2';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})


export class LoginComponent implements OnInit{
  //Component varibles

  //login_form FormGroup to be used as a Model Driven Form
  private login_form:FormGroup;
  //submitLogin keeps track on weather the form has been submitted or not (in order to display errors, if any)
  private submitLogin:Boolean;
  //loader is a boolean that whenever it's set to TRUE, the spinner animation on the Sign in button will be activated
  private loader:Boolean;

  //LoginComponent Constructor, FormBuilder reference, LoginService reference, and Router reference
  constructor(form_builder: FormBuilder, private router:Router){
    //submitLogin is false when the component loads
    this.submitLogin = false;
    this.loader = false;
    //We set the validators and initial values of the fields contained within the login_form
    this.login_form = form_builder.group({
      'username_email' : [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      'password': [null, Validators.compose([Validators.required, Validators.maxLength(25)])]
    })
  }

  ngOnInit(){

  }

  //login(): Sends the information submitted into the login_form to the respective backend's endpoint using the LoginService reference.
  login(){
    //Verifies if login_form is valid
    if(this.login_form.valid){
      //Activate loader spinner animation
      this.loader = true;
      this.router.navigateByUrl('/dashboard/home');
      this.loader = false;
    }else{
      this.submitLogin = true;
    }

  }


  //loginError(): Alerts the user if their password or username is incorrect
  loginError() {
    swal({
      title: "Incorrect Username/Email or Password",
      text: "The provided combination of username/email and password does not exist, please try again.",
      type: "error",
      allowOutsideClick: false
    }).catch(swal.noop)
  }

  //internalServerError(): Alerts the user if there is any error when trying to communicate with the backend server
  internalServerError() {
    swal({
      title: "Internal Server Error",
      text: "Internal Server Error. Be sure you started the backend server before running the frontend. If it still doesn't work, contact Makoto.",
      type: "warning",
      allowOutsideClick: false
    }).catch(swal.noop)
  }
}
