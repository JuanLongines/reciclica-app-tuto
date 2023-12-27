import { waitForAsync } from "@angular/core/testing";
import { LoginPageForm } from "./login.page.form";
import { FormBuilder, FormGroup } from "@angular/forms";

describe('LoginPageForm',()=>{

  let loginPageForm ;
  let form:FormGroup ;
  beforeEach(waitForAsync(() => {
    /*TestBed.configureTestingModule({
      providers:[
        importProvidersFrom(Form)
      ]
    }).compileComponents();*/
      loginPageForm=new LoginPageForm(new FormBuilder());
      form=loginPageForm.createForm();
  }));



  it('should create login form empty',()=>{

    expect(form).not.toBeNull();
    expect(form.get('email')).not.toBeNull();
    expect(form.get('email')!.value).toEqual("");
    expect(form.get('email')!.valid).toBeFalsy();
    expect(form.get('password')).not.toBeNull();
    expect(form.get('password')!.value).toEqual("");
    expect(form.get('password')!.valid).toBeFalsy();


  });

  it('should have email invalid if email is not valid',()=>{
    form.get('email')?.setValue('invalid email');
    expect(form.get('email')!.valid).toBeFalsy();
  });
  it('should have password invalid if password is not valid',()=>{
    form.get('password')?.setValue('12345');
    expect(form.get('password')!.valid).toBeFalsy();
  });

  it('should have email valid if email is valid',()=>{
    form.get('email')?.setValue('anyemail@mail.com');
    expect(form.get('email')!.valid).toBeTruthy();
  });

  it('should have a valid form',()=>{
    form.get('email')?.setValue('anyemail@mail.com');
    form.get('password')?.setValue('anyPass');
    expect(form.valid).toBeTruthy();
  });



});
