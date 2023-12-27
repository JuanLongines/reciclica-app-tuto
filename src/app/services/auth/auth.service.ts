import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {User} from "../../model/user";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { getAuth } from "firebase/auth";
import { initializeApp } from '@angular/fire/app/firebase';
import { environment } from 'src/environments/environment';

 @Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }

  recoverEmailPassword(email:string):Observable<void>{
    const actionCodeSettings: any = {
      url: 'http://www.example.com/resetPassword', // La URL a la que quieres redirigir al usuario.
      handleCodeInApp: true, // Indica que quieres manejar el código en la aplicación.
    };
   // const authtt=getAuth(initializeApp(environment.firebaseConfig));
    return new Observable<void>(observer=>{
     this.auth.sendPasswordResetEmail(email)
     .then(()=>{
      observer.next();
      observer.complete();
     })
     .catch((error)=>{
      const errorr=this.processErrorCode(error);
      observer.error(errorr);
      observer.complete();
    })
    });
  }

  login(email:string, password:string):Observable<User> {
    return new Observable<User>(observer=>{
      setTimeout(()=>{
        if (email==='error@mail.com'){
          observer.error({message:'User not found'})
          observer.next();
        }else {
          const user=new User();
          user.id= Date.now().toString();
          user.email=email;
          observer.next(user);
        }
        observer.complete();
      },3000);
    });
  }

  private processErrorCode(error:any): any{
    switch (error.code) {
      case 'auth/invalid-email':
        return {message:'Invalid email address.'};
      case 'auth/missing-android-pkg-name':
        return {message:'Missing Android package name.'};
      case 'auth/missing-continue-uri':
        return {message:'Missing continue URL.'};
      case 'auth/missing-ios-bundle-id':
        return {message:'Missing iOS Bundle ID.'};
      case 'auth/invalid-continue-uri':
        return {message:'Invalid continue URL.'};
      case 'auth/unauthorized-continue-uri':
        return {message:'Unauthorized continue URL. Whitelist the domain in the Firebase console.'};
      case 'auth/user-not-found':
        return {message:'User not found. No user corresponding to the email address.'};
      default:
        return {message:'Unknown error:'};
    }
  }
}
