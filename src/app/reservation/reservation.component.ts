import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {wards, WardsModel} from '../store/wards-model/wards-model';
import {select, Store} from '@ngrx/store';
import {AmbulanceState, selectPatientsList, selectWardsList, WardsState} from '../store';
import * as fromWardsModel from '../store/wards-model/wards-model.reducer';
import {getSelectedPatient} from '../store/patients-model/patients-model.reducer';
import {PatientModel} from '../store/patients-model/patients-model';
import {Router} from '@angular/router';
import * as fromPatientModel from '../store/patients-model/patients-model.reducer';
import {take} from 'rxjs/operators';
import {loadWardsInit, upsertWard} from '../store/wards-model/wards-model.actions';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})

export class ReservationComponent implements OnInit {
  public wards$: Observable<WardsModel[]>;
  public foundWards: Array<WardsModel> | undefined;
  public selectedPatient: PatientModel | null = null;
  public selectedWard: wards | undefined = undefined;
  public isResourceSelected = false;
  public accommodatedPatients: PatientModel[] = [];
constructor(private wardStore: Store<WardsState>, private ambulanceStore: Store<AmbulanceState>, private router: Router) {
   this.wards$ = wardStore.pipe(
      select(selectWardsList),
      select(fromWardsModel.selectAll));
   ambulanceStore.pipe(
      select(selectPatientsList),
      select(getSelectedPatient)
   ).subscribe((selectedPatient) => selectedPatient ?
     this.selectedPatient = selectedPatient : router.navigate(['/lobby']));
  }
  ngOnInit(): void {
    this.wardStore.dispatch(loadWardsInit());
  }
  removeFromPreviousWard(patient: PatientModel | null, newWardId: string | undefined): void {
    // @ts-ignore
   this.wards$.pipe(take(1)).subscribe(wardsPipe => this.removeWard(wardsPipe, patient.id, newWardId));
  }
  removeWard(wardsData: Array<WardsModel>, patientId: string | undefined, newWardId: string | undefined): void {
    const foundWard = wardsData.find(ward => ward.patientIds.some(id => id === patientId) && ward.id !== newWardId);
    if (foundWard) {
      const patientIds = Object.assign([], foundWard.patientIds);
      const removed = patientIds.filter(id => id !== patientId);
      let actualCapacity: number = foundWard.actualCapacity;
      const editedWard: WardsModel = {
        id: foundWard.id,
        ward: foundWard.ward,
        patientIds: removed,
        maxCapacity: foundWard.maxCapacity,
        actualCapacity: --actualCapacity > 0 ? --actualCapacity : 0
      };
      this.wardStore.dispatch(upsertWard({ward: editedWard}));
    }
  }
  bookPatient(patient: PatientModel | null, ward: WardsModel): void {
   if (patient) {
     let actualCapacity: number = ward.actualCapacity;
     let patientIds: Array<string>  = Object.assign([], ward.patientIds);
     patientIds = [...patientIds, patient.id || ''];
     const editedWard: WardsModel = {
       id: ward.id,
       ward: ward.ward,
       patientIds: [...patientIds],
       maxCapacity: ward.maxCapacity,
       actualCapacity: ++actualCapacity
     };
     this.wardStore.dispatch(upsertWard({ward: editedWard}));
     patient = Object.assign({}, patient, {hospitalWard: [ward.id || '']});
     this.removeFromPreviousWard(patient, ward.id);
     this.showInfo(ward.id);
   }
  }
  showInfo(wardId: string | undefined): void {
    this.accommodatedPatients = [];
    this.wards$.pipe(take(1)).subscribe(wardsPipe => {
      const foundWard = wardsPipe.find(ward => ward.id === wardId);
      const foundWardIds = foundWard?.patientIds;
      this.selectedWard = foundWard?.ward;
      this.ambulanceStore.pipe(
        select(selectPatientsList),
        select(fromPatientModel.selectAll),
      ).subscribe((patients) =>
        {
          const foundWardPatients: PatientModel[] = patients.filter(patient => patient.id ? foundWardIds?.includes(patient.id) : false);
          foundWardPatients.forEach(foundPatient => this.accommodatedPatients.push(foundPatient));
        }
      );
    });
    this.isResourceSelected = true;
}

}
