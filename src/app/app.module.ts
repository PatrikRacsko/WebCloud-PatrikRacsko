import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule } from '@angular/common/http';

// App components
import { AmbulanceContentComponent } from './ambulance-content/ambulance-content.component';
import { AmbulanceContextComponent } from './ambulance-context/ambulance-context.component';
import { FilterComponent } from './filter/filter.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AppointmentComponent } from './appointment/appointment.component';
// Material components
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MainComponent } from './main/main.component';
import {CalendarModule} from 'angular-calendar';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { CreatePatientComponent } from './create-patient/create-patient.component';


@NgModule({
  declarations: [
    AppComponent,
    AmbulanceContentComponent,
    AmbulanceContextComponent,
    FilterComponent,
    ReservationComponent,
    AppointmentComponent,
    MainComponent,
    CreatePatientComponent
  ],
  exports: [RouterModule],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    StoreModule.forRoot(reducers), EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [], CalendarModule, FormsModule,
    StoreRouterConnectingModule.forRoot(), MatTableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
