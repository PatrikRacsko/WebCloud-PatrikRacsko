import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { PatientModel } from '../app/store/patients-model/patients-model';
import { WardsModel} from '../app/store/wards-model/wards-model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AmbulancePatientsListService {

  public constructor(private httpClient: HttpClient, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  private get baseUrl() {
    const baseUrl = environment.apiBaseUrl || '/api';
    return `${baseUrl}/ambulance`;
  }
  public getAllPatients(deps: any, sevs: any): Observable<PatientModel[]> {
    return this.httpClient
      .get(`${this.baseUrl}/getPatients?severity=${[...sevs]}&department=${[...deps]}`)
      .pipe(map(response => (response as any) as Array<PatientModel>));
  }
  public getAllWards(): Observable<WardsModel[]> {
    return this.httpClient
      .get(`${this.baseUrl}/getWards`)
      .pipe(map(response => (response as any) as Array<WardsModel>));
  }
  public upsertPatient(patient: PatientModel): Observable<boolean> {
    return this.httpClient
      .post(`${this.baseUrl}/upsertPatient`, patient)
      .pipe(
        map(_ => {
          this.router.navigate(['/lobby']);
          return true;
        }),
        catchError(err => {
          if (err.error instanceof Error) {
            console.error(`Error upserting entry ${patient.id}: ${err.error.message}`);
          } else {
            console.error(`Error upserting entry ${patient.id}: ${err.status}: ${err.error}`);
          }
          return of(false);
        }));
  }
  public upsertWard(ward: WardsModel): Observable<boolean> {
    return this.httpClient
      .post(`${this.baseUrl}/upsertWard`, ward)
      .pipe(
        map(_ => true ),
        catchError(err => {
          if (err.error instanceof Error) {
            console.error(`Error upserting entry ${ward.id}: ${err.error.message}`);
          } else {
            console.error(`Error upserting entry ${ward.id}: ${err.status}: ${err.error}`);
          }
          return of(false);
        }));
  }
  public deletePatient(patientId: string): Observable<boolean> {
    return this.httpClient
      .delete(`${this.baseUrl}/deletePatient/${patientId}`)
      .pipe(
        map(_ => {
          return true;
        }),
        catchError(err => {
          if (err.error instanceof Error) {
            console.error(`Error upserting entry ${patientId}: ${err.error.message}`);
          } else {
            console.error(`Error upserting entry ${patientId}: ${err.status}: ${err.error}`);
          }
          return of(false);
        })
      );
  }
}
