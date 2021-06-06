import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AmbulanceState, selectPatientsList } from '../store';
import {getSelectedPatient} from '../store/patients-model/patients-model.reducer';
import {PatientModel} from '../store/patients-model/patients-model';
import {deletePatient} from '../store/patients-model/patients-model.actions';


@Component({
  selector: 'app-ambulance-context',
  templateUrl: './ambulance-context.component.html',
  styleUrls: ['./ambulance-context.component.css']
})
export class AmbulanceContextComponent implements OnInit {
  isResourceSelected = false;
  public selectedPatient: PatientModel | null = null;
  constructor(private store: Store<AmbulanceState>) {
    store.pipe(
      select(selectPatientsList),
      select(getSelectedPatient)
    ).subscribe((selectedPatient) => selectedPatient ? this.showPatient(selectedPatient) : '');
  }

  ngOnInit(): void {
  }
  showPatient(selectedPatient: PatientModel): void {
    this.isResourceSelected = true;
    this.selectedPatient = selectedPatient;
  }
  deletePatient(): void {
    this.isResourceSelected = false;
    if (this.selectedPatient?.id !== null) {
     // @ts-ignore
     this.store.dispatch(deletePatient({id: this.selectedPatient.id}));
   }
  }
  mapHospitalWards(hospitalWard: Array<string> | null): string {
    if (!hospitalWard || hospitalWard.length === 0) {
      return 'None';
    }
    switch (Number(hospitalWard[0])) {
      case 1:
        return 'Surgical';
      case 2:
        return 'Long term sick';
      case 3:
        return 'Trauma';
      case 4:
        return 'Pediatric';
      default:
        return 'None';
    }
  }

}
