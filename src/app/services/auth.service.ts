import * as authActions from './../auth/auth.actions';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription = new Subscription()

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>) { }

  initAuthLsitener(){
    this.auth.authState.subscribe( fuser =>{
      //console.log(fuser)
      if(fuser){
        this.userSubscription = this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges().subscribe( (firestoreUser : any) =>{
          const user = Usuario.fromFirebas(firestoreUser)
          this.store.dispatch(authActions.setUser({ user }))
         } )
      }else{
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }
    })
  }

  crearUsuario(nombre: string, email: string, password:string){

    return this.auth.createUserWithEmailAndPassword(email,password)
              .then(({user})=>{
                if(user?.uid){
                  const newUser = new Usuario(user.uid,nombre,email);
                  return this.firestore.doc(`${ user.uid }/usuario`).set({ ...newUser });
                }else{
                  return
                }
              })
  }

  loginUsuario(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState
      .pipe(map(fbUser => fbUser != null));
  }
}
