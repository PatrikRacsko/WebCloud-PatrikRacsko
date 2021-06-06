import { createAction, props} from '@ngrx/store';
import { PatientModel } from './patients-model';

export const loadPatients = createAction(
  '[PatientModel] Load multiple patients from PatientModel',
  props<{ patientModels: PatientModel[] }>()
);

export const loadPatientsInit = createAction(
  '[PatientModel] Load multiple patients from Service',
  props<{ deps: any, sevs: any}>()
);

export const deletePatient = createAction(
  '[PatientModel] Delete Patient',
  props<{ id: string }>()
);

export const upsertPatient = createAction(
  '[PatientModel] Upsert patient',
  props<{ patientModel: PatientModel}>()
);



export const setSelectedPatient = createAction(
  '[PatientModel] Set selected patient',
  props<{ patientModel: PatientModel}>()
);
