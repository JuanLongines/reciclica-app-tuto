import { Injectable } from '@angular/core';
import { Observable, catchError, from, mergeMap, switchMap, throwError} from 'rxjs';
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

  recoverEmailPassword(email: string): Observable<void> {
    return from(this.auth.fetchSignInMethodsForEmail(email)).pipe(
      mergeMap((signInMethods) => {
        if (signInMethods.length > 0) {
          // El correo está registrado, intenta restablecer la contraseña
          return from(this.auth.sendPasswordResetEmail(email)).pipe(
            catchError((error) => {
              const errorCode = this.processErrorCode(error);
              return throwError(errorCode);
            })
          );
        } else {
          // El correo no está registrado
          return throwError({message:'User not found. No user corresponding to the email address.'});
        }
      }),
      catchError((error) => {
        return throwError(error); 
      })
    );
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
