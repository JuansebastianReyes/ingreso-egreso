import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { createAction, props } from '@ngrx/store';

export const setItems = createAction('[IngresoEgreso] Set items' ,props<{ items : IngresoEgreso[] }>());
export const unSetItems = createAction('[IngresoEgreso] Unset Items');
