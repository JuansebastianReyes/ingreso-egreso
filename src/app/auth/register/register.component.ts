import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from './../../shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSeucscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store:Store<AppState>,
    private router : Router) {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required ],
      correo: ['',[ Validators.required, Validators.email ]],
      password: ['', Validators.required ]
    });
   }

  ngOnInit(): void {
    this.uiSeucscription = this.store.select('ui').subscribe(
      (ui)=>{
        this.cargando = ui.isLoading;
      }
    )
  }

  ngOnDestroy(): void {
    this.uiSeucscription.unsubscribe()
  }

  crearUsuario(){
    if(this.registroForm.invalid){return}

    this.store.dispatch(ui.isLoading())
    /* Swal.fire({
      title: 'Espere por favor',
      didOpen:()=>{
        Swal.showLoading(null)
      }
    }) */

    const {nombre, correo, password} = this.registroForm.value;
    this.authService.crearUsuario(nombre, correo, password)
      .then( credenciales =>{
        console.log(credenciales)
        /* Swal.close(); */
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/']);
      })
      .catch(err=>
      {
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
  }

}
