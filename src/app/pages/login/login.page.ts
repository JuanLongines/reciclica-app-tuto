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
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/store/login/login.actions';
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
      this.isRecoveringPassword(loginState);
      this.isRecoveredPassword(loginState);
      this.onIsRecoverPasswordFail(loginState);
    });
  }

  ngOnDestroy(): void {
    if(this.loginSubscriber){
      this.loginSubscriber.unsubscribe();
    }
  }

  private isRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {      
      this.store.dispatch(show());
      const email= this.form.get('email')?.value;
      this.authService.recoverEmailPassword(email).subscribe(()=>{
        this.store.dispatch(recoverPasswordSuccess());
      },error=>{
        console.log('error',error);
        this.store.dispatch(recoverPasswordFail({error}));
      });
    }
  }

  private async isRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      this.store.dispatch(hide());
      const toast = await this.toastController.create({
        position: 'bottom',
        message: 'password recovered',
        duration:5000,
        color: 'primary',
      });
      toast.present();
    }
  }

  private async onIsRecoverPasswordFail(loginState:LoginState){
    if(loginState.error){
      this.store.dispatch(hide());
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
    this.router.navigate(['home']);
  }

  register() {
    this.router.navigate(['register']);
  }
}
