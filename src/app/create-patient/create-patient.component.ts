import { Component, OnInit } from '@angular/core';
import {PatientModel} from '../store/patients-model/patients-model';
import {Store} from '@ngrx/store';
import {AmbulanceState} from '../store';
import {upsertPatient} from '../store/patients-model/patients-model.actions';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {
  public data: PatientModel = {
    id: '-1',
    name: null,
    disease: null,
    diseaseSeverity: null,
    isHospitalized: false,
    hospitalWard: [],
    appointmentDate: '',
    appointmentTimeStart: '',
    appointmentTimeEnd: ''
  };
  constructor(private store: Store<AmbulanceState>) { }

  ngOnInit(): void {
  }

  handleDisable(): boolean {
    return this.data.disease === null || this.data.diseaseSeverity === null || this.data.name === null;
  }
   save(): void {
    this.store.dispatch(upsertPatient({ patientModel: this.data }));
  }

}
