import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWhitIngreso extends AppState{
  ingresoEgreso: State
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on( setItems,   (state, { items }) => ({ ...state, items: [...items]  })),
    on(unSetItems, state =>({...state, items: []}))
);

export function ingresoEgresoReducer(state :any, action: any) {
    return _ingresoEgresoReducer(state, action);
}
