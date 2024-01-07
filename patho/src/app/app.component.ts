import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AuthenticationService } from '../app/_services/authentication.service';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pathoE';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private _snackBar: MatSnackBar, private router: Router) {
  }
  userLogin = this.formBuilder.group({
    email: '',
    password: ''
  });
  userSignup = this.formBuilder.group({
    fullname: '',
    email: '',
    password: '',
    vpassword: '',
    profil: ''
  });
  nameUser: any;
  message: string = ''
  log: boolean = false
  app: boolean = false

  isSignin: boolean = false
  isSignup: boolean = false
  isHome: boolean = false
  isForgot: boolean = false


  openSnackBar(message: any) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  created() {
    // console.log(this.userLogin.value, this.userLogin.value.password)
    if (this.userSignup.value.password == this.userSignup.value.vpassword) {
      this.auth.created(this.userSignup.value.fullname, this.userSignup.value.email, this.userSignup.value.vpassword, this.userSignup.value.profil)
        .subscribe(
          response => {
            //console.log(response);
            // window.location.reload();
            if (localStorage.getItem("currentUser")) {
              this.signIn()
            }
          }, error => {
            console.log('error', error.error.msg);
            this.message = error.error.msg
            this.openSnackBar(this.message);

          }
        );
    } else {
      this.openSnackBar('Passwords are different, try again !');
    }
    //this.loginF = true
  }

  login() {
    // console.log(this.userLogin.value, this.userLogin.value.password)
    this.auth.login(this.userLogin.value.email, this.userLogin.value.password)
      .subscribe(
        response => {
          console.log(response)
          /*  if (localStorage.getItem('currentUser')) {*/
          this.home()
          this.openSnackBar('Connected');
          window.location.reload();
          // }
        },
        error => {
          console.log('error', error.error.msg);
          this.message = error.error.msg
          this.openSnackBar(this.message,);

        }
      );

    //this.loginF = true
  }
  reload() {
    this.auth.reload()
      .subscribe(
        response => {
          //  console.log("Reload")
        }, error => { }
      );
    this.openSnackBar('Backend realod....');
  }
  clean() {
    this.auth.clean()
      .subscribe(
        response => {
          //  console.log("Reload")
        }, error => { }
      );
    this.openSnackBar('All files deleted....');
  }
  logout() {
    this.signIn();
    this.auth.logout();
    window.location.reload();
  }
  ngOnInit() {
    this.nameUser = localStorage.getItem('currentUser')
    console.log(this.nameUser)
    if (this.nameUser) {
      this.home()
    } else {
      this.signIn()
    }
  }
  signIn() {
    this.isSignin = true
    this.isSignup = false
    this.isHome = false
    this.isForgot = false
  }
  signUp() {
    this.isSignin = false
    this.isSignup = true
    this.isHome = false
    this.isForgot = false
  }
  home() {
    this.isSignin = false
    this.isSignup = false
    this.isHome = true
    this.isForgot = false
  }
  forget() {
    this.isSignin = false
    this.isSignup = false
    this.isHome = false
    this.isForgot = true
  }

}
