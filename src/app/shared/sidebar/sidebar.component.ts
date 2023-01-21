import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string = ''
  userSubs: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user').subscribe(({user}) =>{
      if(user)
      this.nombre = user?.nombre
    })
  }

  ngOnDestroy(): void {
      this.userSubs.unsubscribe();
  }

  logout(){
    this.authService.logout()
      .then(()=>{
        this.router.navigate(['/login'])
      });
  }
}
