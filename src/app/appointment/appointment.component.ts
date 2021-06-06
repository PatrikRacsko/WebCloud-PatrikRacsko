import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {endOfDay, startOfDay} from 'date-fns';
import {CalendarEvent, CalendarView,} from 'angular-calendar';
import {select, Store} from '@ngrx/store';
import {AmbulanceState, selectPatientsList} from '../store';
import {getSelectedPatient} from '../store/patients-model/patients-model.reducer';
import {PatientModel, severities} from '../store/patients-model/patients-model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {upsertPatient} from '../store/patients-model/patients-model.actions';
import * as fromPatientModel from '../store/patients-model/patients-model.reducer';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  green: {
    primary: '#008000',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  @ViewChild('myTemplate') customTemplate: TemplateRef<any> | undefined;
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  activeDayIsOpen = true;
  events: CalendarEvent[] = [];
  public selectedPatient: any | null = null;
  constructor(public dialog: MatDialog, private store: Store<AmbulanceState>, private router: Router) {
    store.pipe(
      select(selectPatientsList),
      select(getSelectedPatient)
    ).subscribe((selectedPatient) =>
      selectedPatient ? this.showPatient(selectedPatient) : router.navigate(['/lobby']));
  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectPatientsList),
      select(fromPatientModel.selectAll),
    ).subscribe((patients) => {
      const bookedPatients = patients.filter(patient => patient.appointmentDate);
      if (bookedPatients.length > 0) {
       bookedPatients.forEach(bookedPatient => this.addEvent(bookedPatient.appointmentDate, bookedPatient));
      }
    });
  }
  bookPatient(data: any): void {
    const updatedPatientModel = Object.assign({}, data, {appointmentDate: data.probablyDate.toISOString()} );
    delete updatedPatientModel.probablyDate;
    this.store.dispatch(upsertPatient({ patientModel: updatedPatientModel }));
  }
  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
  calculateDiseaseSeverity(severity: severities | null): string {
    switch (severity) {
      case severities.high:
        return 'red';
      case severities.medium:
        return 'yellow';
      case severities.low:
        return 'green';
      default:
        return 'yellow';
    }
  }

  addEvent(date: string | null, patientModel: PatientModel): void {
    const startDate = moment(date).set({hour: Number(patientModel.appointmentTimeStart)}).toDate();
    const endDate = moment(date).set({hour: Number(patientModel.appointmentTimeEnd)}).toDate();
    this.events = [
      ...this.events,
      {
        title: patientModel.name + ' ' + patientModel.disease,
        start: startOfDay(startDate),
        end: endOfDay(endDate),
        color: colors[this.calculateDiseaseSeverity(patientModel?.diseaseSeverity)],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }
  dayClicked({ date }: { date: Date; }): void {
    this.openDialog(date);
  }
  showPatient(selectedPatient: PatientModel): void {
    this.selectedPatient = selectedPatient;
  }
  openDialog(date: Date): void {
    if (this.customTemplate) {
      const updatedSelectedPatient = Object.assign({}, this.selectedPatient, {probablyDate: date} );
      const dialogRef = this.dialog.open(this.customTemplate, {
        data: {...updatedSelectedPatient},
      });
    }
  }

}
