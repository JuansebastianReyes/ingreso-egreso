import * as ingresoEgresoActions from './../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription = new Subscription();
  ingresoSubs: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe(({user})=>{
        console.log(user)
        if(user)
        this.ingresoSubs = this.ingresoEgresoService.initIngresosEgresosListener(user?.uid)
          .subscribe(ingreosEgresos => {
            this.store.dispatch(ingresoEgresoActions.setItems({items: ingreosEgresos}))
          })
      })
  }

  ngOnDestroy(): void {
      this.ingresoSubs.unsubscribe()
      this.userSubs.unsubscribe()
  }

}
