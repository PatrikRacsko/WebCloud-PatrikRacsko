import {createReducer, createSelector, on} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { WardsModel } from './wards-model';
import * as WardModelActions from './wards-model.actions';
export const wardModelFeatureKey = 'wardModels';

export interface WardsState extends EntityState<WardsModel> {
  selectedWard: WardsModel | null;
}

export const adapter: EntityAdapter<WardsModel> = createEntityAdapter<WardsModel>();

export const initialState: WardsState = adapter.getInitialState({
  selectedWard: null
});

export const WardsReducer = createReducer(
  initialState,
  on(WardModelActions.loadWards,
    (state, action) => adapter.setAll(action.wardModels, state)
  ),
  on(WardModelActions.setSelectedWard,
    (state, action) => ({...state, selectedWard: action.selectedWard})),
  on(WardModelActions.upsertWard,
    (state, action) => adapter.upsertOne(action.ward, state)
  )
);

export const getSelectedWard = (state: WardsState) => state.selectedWard;

export const getSelectedSelectedPatient = createSelector(getSelectedWard, (selectedWard) => {
  return selectedWard;
});


export const {
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
