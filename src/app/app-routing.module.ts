import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import {ReservationComponent} from './reservation/reservation.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {CreatePatientComponent} from './create-patient/create-patient.component';

export const routes: Routes = [
  { path: 'lobby', component: MainComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'create-patient', component: CreatePatientComponent},
  {
    path: '',
    redirectTo: '/lobby',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
