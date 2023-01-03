import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router : Router) {
    this.loginForm = this.fb.group({
      correo: ['',[ Validators.required, Validators.email ]],
      password: ['', Validators.required ]
    })
   }

  ngOnInit(): void {
  }

  loginUser(){
    if(this.loginForm.invalid){return}

    Swal.fire({
      title: 'Espere por favor',
      didOpen:()=>{
        Swal.showLoading(null)
      }
    })

    const { correo, password} = this.loginForm.value
    console.log(correo, password)

    this.authService.loginUsuario(correo, password)
      .then(credenciales=>{
        console.log(credenciales)
        Swal.close();
        this.router.navigate(['/'])
      })
      .catch(err=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      })
  }
}
