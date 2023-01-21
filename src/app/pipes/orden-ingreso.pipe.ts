import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return  [...items].sort(
      (a : IngresoEgreso,b: IngresoEgreso)=>{
        return a.tipo === 'ingreso' ? -1 : 1;
      }
    );
  }

}
