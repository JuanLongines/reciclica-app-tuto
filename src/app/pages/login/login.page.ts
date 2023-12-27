import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPageForm } from './login.page.form';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/store/app.store.state';
import { hide, show } from 'src/app/store/loading/loading.actions';
import {
  login, loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess
} from 'src/app/store/login/login.actions';
import { ToastController } from '@ionic/angular/standalone';
import { LoginState } from 'src/app/store/login/LoginState';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
})
export class LoginPage implements OnInit,OnDestroy {
  form!: FormGroup;
  loginSubscriber!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppStoreState>,
    private toastController: ToastController,
    private authService:AuthService
  ) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
    this.loginSubscriber= this.store.select('login').subscribe( (loginState) => {
      this.isRecoveredPassword(loginState);
      this.isRecoveringPassword(loginState);
      this.onError(loginState);

      this.onIsLogginIn(loginState);
      this.onIsLoggedIn(loginState);

      this.toggleLoading(loginState);

    });
  }

  ngOnDestroy(): void {
    if(this.loginSubscriber){
      this.loginSubscriber.unsubscribe();
    }
  }

  private toggleLoading(loginState:LoginState){
    if(loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show());
    }else {
      this.store.dispatch(hide());
    }

  }

  private onIsLogginIn(loginState:LoginState){
    if (loginState.isLoggingIn){
      const email=this.form.get('email')?.value;
      const password=this.form.get('password')?.value;
      this.authService.login(email,password).subscribe(user=>{
        this.store.dispatch(loginSuccess({user}));
      },error => this.store.dispatch(loginFail({error})));
    }
  }

  private onIsLoggedIn(loginState:LoginState){
    if (loginState.isLoggedIn){
      this.router.navigate(['home']);
    }
  }

  private isRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {
      const email= this.form.get('email')?.value;
      this.authService.recoverEmailPassword(email).subscribe(()=>{
        this.store.dispatch(recoverPasswordSuccess());
      },error=>{
        this.store.dispatch(recoverPasswordFail({error}));
      });
    }
  }

  private async isRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      const toast = await this.toastController.create({
        position: 'bottom',
        message: 'password recovered',
        duration:5000,
        color: 'primary',
      });
      toast.present();
    }
  }

  private async onError(loginState:LoginState){
    if(loginState.error){
      const toast = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        duration:5000,
        color: 'danger',
      });
      toast.present();
    }

  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword());
  }

  login() {
    this.store.dispatch(login());
  }

  register() {
    this.router.navigate(['register']);
  }
}
