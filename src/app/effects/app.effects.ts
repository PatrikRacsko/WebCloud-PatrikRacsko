import { Injectable } from '@angular/core';
import {Actions, ROOT_EFFECTS_INIT, ofType, createEffect, act} from '@ngrx/effects';
import {deletePatient, loadPatients, loadPatientsInit, upsertPatient} from '../store/patients-model/patients-model.actions';
import {loadWards, loadWardsInit, upsertWard} from '../store/wards-model/wards-model.actions';
import {map, mergeMap} from 'rxjs/operators';
import { AmbulancePatientsListService} from '../../services/ambulance-patients-list.service';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private patientsListService: AmbulancePatientsListService) { }
  init$ = createEffect(() => this.actions$.pipe(
    ofType(loadPatientsInit),
    mergeMap((action) =>
      this.patientsListService.getAllPatients(action.deps, action.sevs)),
    map(patients => loadPatients({ patientModels: patients})),
  ));
  initWards$ = createEffect(() => this.actions$.pipe(
    ofType(loadWardsInit),
    mergeMap(_ => this.patientsListService.getAllWards()),
    map(wards => loadWards({ wardModels: wards})),
  ));
  deletePatient = createEffect(() => this.actions$.pipe(
    ofType(deletePatient),
    mergeMap((action) =>
      this.patientsListService.deletePatient(action.id))),
    { dispatch: false });
  upsertPatient = createEffect(() => this.actions$.pipe(
    ofType(upsertPatient),
    mergeMap((action) =>
      this.patientsListService.upsertPatient(action.patientModel))),
    { dispatch: false });
  upsertWard$ = createEffect(() => this.actions$.pipe(
    ofType(upsertWard),
    mergeMap((action) =>
      this.patientsListService.upsertWard(action.ward))),
    { dispatch: false });
}
