import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { routes } from 'src/app/app.routes';
import { LoginPage } from './login.page';
import { Store, provideState, provideStore } from '@ngrx/store';
import { loadingFeature } from 'src/app/store/loading/loading.reducers';
import { loginFeature } from 'src/app/store/login/login.reducers';
import { AppStoreState } from 'src/app/store/app.store.state';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/store/login/login.actions';
import { ToastController } from '@ionic/angular/standalone';
import {AuthService} from "../../services/auth/auth.service";
import {of, throwError} from "rxjs";
import {User} from "../../model/user";

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page:any;
  let store: Store<AppStoreState>;
  let toastController: ToastController;
  let authService:AuthService;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideRouter(routes),
        provideStore(),
        provideState(loadingFeature),
        provideState(loginFeature)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router=TestBed.inject(Router);
    page= fixture.debugElement.nativeElement;
    store= TestBed.inject(Store);
    toastController= TestBed.inject(ToastController);
    authService= TestBed.inject(AuthService);
    fixture.detectChanges();
  }));

  it('should create from on init',async ()=>{
    component.ngOnInit();
    await fixture.whenStable();

    expect(component.form).not.toBeUndefined();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should go to home page on login',()=>{
    spyOn(router,'navigate');
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });*/

  it('should go to register page on register',()=>{
    spyOn(router,'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot email/password',()=>{
    //start page
    //user set value email
    //user clicked on forgot email/password button
    //expect loginState.isRecoveringPassword is true
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@mail.com');
    page.querySelector("#recoverPasswordButton").click();
    store.select('login').subscribe(loginState=>{
      expect(loginState.isRecoveringPassword).toBeTruthy();
    });

  });

  it('should show loading when recovering',()=>{
    //start page
    //user set value email
    //user clicked on forgot email/password button
    //expect loginState.isRecoveringPassword is true
    fixture.detectChanges();
    store.dispatch(recoverPassword())
    //component.form.get('email')?.setValue('valid@mail.com');
    //page.querySelector("#recoverPasswordButton").click();
    store.select('loading').subscribe(loadingState=>{
      expect(loadingState.show).toBeTruthy();
    });

  });

  it('should hide loading and show success message when has recovered password',()=>{
    //start page
    //set login state as recovering password
    //set login state as recovered password
    //verify loadingState.show === false
    //verify message was shown
    spyOn(toastController,'create');
    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState=>{
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledTimes(1);

  });

  it('should hide loading and show error message when has error on recovered password',()=>{
    //start page
    //recover password
    //recover password fail
    //verify loadingState.hide === true
    //verify message error was shown
    spyOn(toastController,'create');
    fixture.detectChanges();
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({error:'message'}));
    store.select('loading').subscribe(loadingState=>{
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledTimes(1);

  });

  it('should shown loading and login when logging in ',()=>{
    //start page
    //set valid email
    //set valid password
    //click on login button
    //expect loading show
    //expect logging in
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@mail.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector("#loginButton").click();
    store.select('loading').subscribe(loadingState=>{
      expect(loadingState.show).toBeTruthy();
    });
    store.select('login').subscribe(loginState=>{
      expect(loginState.isLoggingIn).toBeTruthy();
    });

  });

  it('should hide loading and send user to Home page when user has logged in',()=>{
    //start page
    //set valid email
    //set valid password
    //click on login button
    //expect loading hidden
    //expect logging in
    //expect home page showing
    spyOn(router,'navigate');
    spyOn(authService,'login').and.returnValue(of(new User()));
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@mail.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector("#loginButton").click();
    store.select('loading').subscribe(loadingState=>{
      expect(loadingState.show).toBeFalsy();
    });
    store.select('login').subscribe(loginState=>{
      expect(loginState.isLoggedIn).toBeTruthy();
    });
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should hide loading and show error message when user couldntlogin',()=>{
    spyOn(authService,'login').and.returnValue(throwError(()=>'error'));

    spyOn(toastController,'create').and.returnValue(<any>Promise.resolve({present:()=>{}}));

    fixture.detectChanges();
    component.form.get('email')?.setValue('error@mail.com');
    component.form.get('password')?.setValue('anyPassword');
    page.querySelector("#loginButton").click();
    store.select('loading').subscribe(loadingState=>{
      expect(loadingState.show).toBeFalsy();
    });

    expect(toastController.create).toHaveBeenCalledTimes(1);

  });

});
