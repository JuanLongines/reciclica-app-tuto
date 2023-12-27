import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {User} from "../../model/user";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }

  recoverEmailPassword(email:string):Observable<void>{
    return new Observable<void>(observer=>{
     this.auth.sendPasswordResetEmail(email)
     .then(()=>{
      observer.next();
      observer.complete();
     })
     .catch(error=>{
      console.log('errorAuth',error)
      observer.error(error);
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
}
