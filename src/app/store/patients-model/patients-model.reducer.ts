import {createReducer, createSelector, on} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PatientModel } from './patients-model';
import * as PatientModelActions from './patients-model.actions';

export const patientModelsFeatureKey = 'patientModels';

export interface State extends EntityState<PatientModel> {
  selectedPatient: PatientModel | null;
}

export const adapter: EntityAdapter<PatientModel> = createEntityAdapter<PatientModel>();

export const initialState: State = adapter.getInitialState({
  selectedPatient: null
});

export const PatientsReducer = createReducer(
  initialState,
  on(PatientModelActions.loadPatients,
    (state, action) => adapter.setAll(action.patientModels, state)
  ),
  on(PatientModelActions.deletePatient,
    (state, action) => adapter.removeOne(action.id, state)
    ),
  on(PatientModelActions.setSelectedPatient,
    (state, action) => ({...state, selectedPatient: action.patientModel})),
  on(PatientModelActions.upsertPatient,
    (state, action) => adapter.upsertOne(action.patientModel, state)
  )
);

export const getSelectedPatient = (state: State) => state.selectedPatient;

export const getSelectedSelectedPatient = createSelector(getSelectedPatient, (selectedPatient) => {
  return selectedPatient;
});
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
