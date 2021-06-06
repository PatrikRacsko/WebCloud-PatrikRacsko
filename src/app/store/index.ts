import { ActionReducerMap } from '@ngrx/store';
import * as fromPatientModel from './patients-model/patients-model.reducer';
import * as fromWardModel from './wards-model/wards-model.reducer';
import { routerReducer, RouterReducerState, SerializedRouterStateSnapshot } from '@ngrx/router-store';

export const selectPatientsList =
  (state: AmbulanceState): fromPatientModel.State => state[fromPatientModel.patientModelsFeatureKey];

export const selectWardsList =
  (state: WardsState): fromWardModel.WardsState => state[fromWardModel.wardModelFeatureKey];

export interface AmbulanceState {
  router: RouterReducerState<SerializedRouterStateSnapshot>;
  [fromPatientModel.patientModelsFeatureKey]: fromPatientModel.State;
}

export interface WardsState {
  router: RouterReducerState<SerializedRouterStateSnapshot>;
  [fromWardModel.wardModelFeatureKey]: fromWardModel.WardsState;
}

export const reducers = {
  router: routerReducer,
  [fromPatientModel.patientModelsFeatureKey]: fromPatientModel.PatientsReducer,
  [fromWardModel.wardModelFeatureKey]: fromWardModel.WardsReducer
};

