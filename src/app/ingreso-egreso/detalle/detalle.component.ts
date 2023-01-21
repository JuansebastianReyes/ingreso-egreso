import Swal  from 'sweetalert2';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from './../../models/ingreso-egreso.model';
import { AppState } from './../../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos:IngresoEgreso[] = [];
  ingresosSubs: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresoEgreso').subscribe(({items})=>{
      this.ingresosEgresos = items;
    })
  }

  ngOnDestroy(): void {
      this.ingresosSubs.unsubscribe();
  }

  borrar(uid?: string){
    if(uid)
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(
        ()=> Swal.fire('Borrado','Item Borrado','success')
      ).catch(
        (err)=> Swal.fire('Error', err.message ,'error')
      )
  }
}
