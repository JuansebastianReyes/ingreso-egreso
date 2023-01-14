import * as ui from './../../shared/ui.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSeucscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store:Store<AppState>,
    private router : Router) {
    this.loginForm = this.fb.group({
      correo: ['',[ Validators.required, Validators.email ]],
      password: ['', Validators.required ]
    })
   }

  ngOnInit(): void {
    this.uiSeucscription = this.store.select('ui').subscribe(
      (ui)=>{
        this.cargando = ui.isLoading
        console.log('cargando subs')
      }
    )
  }

  ngOnDestroy(): void {
      this.uiSeucscription.unsubscribe()
  }

  loginUser(){
    if(this.loginForm.invalid){return}

    this.store.dispatch(ui.isLoading())

    /* Swal.fire({
      title: 'Espere por favor',
      didOpen:()=>{
        Swal.showLoading(null)
      }
    }) */

    const { correo, password} = this.loginForm.value
    console.log(correo, password)

    this.authService.loginUsuario(correo, password)
      .then(credenciales=>{
        console.log(credenciales)
        /* Swal.close(); */
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/'])
      })
      .catch(err=>{
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
  }
}
