import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { PatientModel, severities } from '../store/patients-model/patients-model';
import { Store, select } from '@ngrx/store';
import { AmbulanceState, selectPatientsList } from '../store';
import * as fromPatientModel from '../store/patients-model/patients-model.reducer';
import {map} from 'rxjs/operators';
import {loadPatientsInit, setSelectedPatient} from '../store/patients-model/patients-model.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ambulance-content',
  templateUrl: './ambulance-content.component.html',
  styleUrls: ['./ambulance-content.component.css']
})
export class AmbulanceContentComponent implements OnInit {
  public patients$: Observable<PatientModel[]>;
  constructor(private store: Store<AmbulanceState>, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.patients$ = store.pipe(
      select(selectPatientsList),
      select(fromPatientModel.selectAll));
  }

  ngOnInit(): void {
    this.store.dispatch(loadPatientsInit({deps: '', sevs: ''}));
  }
  showPatient(patientId: string | undefined): void {
    this.store.pipe(
      select(selectPatientsList),
      select(fromPatientModel.selectAll),
      map(patients => patients.find(patient => String(patient.id) === patientId)),
    ).subscribe(foundPatient =>
      foundPatient ? this.store.dispatch(setSelectedPatient({ patientModel: foundPatient}))
      : '');
  }
  handleChipColor(patientState: severities | null): string {
    switch (patientState) {
      case 'Low':
        return '#00C851';
      case 'Medium':
        return '#ffbb33';
      case 'High':
        return '#ff4444';
      default:
        return '#00C851';
    }
  }

}
