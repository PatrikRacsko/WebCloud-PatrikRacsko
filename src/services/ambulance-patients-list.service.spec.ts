import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AmbulancePatientsListService} from './ambulance-patients-list.service';
import {RouterTestingModule} from '@angular/router/testing';
import {environment} from 'src/environments/environment';
import {PatientModel, severities} from '../app/store/patients-model/patients-model';
import {WardsModel} from '../app/store/wards-model/wards-model';
import {wards} from '../app/store/wards-model/wards-model';


describe('AmbulancePatientsListService', () => {
  let service: AmbulancePatientsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(AmbulancePatientsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should send post to Patients API creating a patient`,  () => {
    // given
    const patient: PatientModel = {
      id: '-1',
      name: 'Patrik Racsko',
      isHospitalized: false,
      disease: 'Broken ankle',
      diseaseSeverity: severities.high,
      hospitalWard: [],
      appointmentDate: null,
      appointmentTimeStart: null,
      appointmentTimeEnd: null
    };
    // when
    service.upsertPatient(patient).subscribe(_ => {});
    // then
    const testingHttpClient: HttpTestingController = TestBed.inject(HttpTestingController);
    const testRequest = testingHttpClient.expectOne(
      `${environment.apiBaseUrl}/ambulance/upsertPatient`);

    expect(testRequest.request.method).toBe('POST');
    testRequest.flush({});
    testingHttpClient.verify();
  });

  it('should send delete to Patients API hence deleting a patient', () => {
    // given
    const patient: PatientModel = {
      id: '-1',
      name: 'Patrik Racsko',
      isHospitalized: false,
      disease: 'Broken ankle',
      diseaseSeverity: severities.high,
      hospitalWard: [],
      appointmentDate: null,
      appointmentTimeStart: null,
      appointmentTimeEnd: null
    };
    // when
    service.deletePatient(patient.id || '').subscribe(_ => {});
    // then
    const testingHttpClient: HttpTestingController = TestBed.inject(HttpTestingController);
    const testRequest = testingHttpClient.expectOne(
      `${environment.apiBaseUrl}/ambulance/deletePatient/${patient.id}`);

    expect(testRequest.request.method).toBe('DELETE');
    testRequest.flush({});
    testingHttpClient.verify();
  });

  it('should send get to Patients API hence getting patients', () => {
    // given
    // when
    service.getAllPatients('', '').subscribe(_ => {});
    // then
    const testingHttpClient: HttpTestingController = TestBed.inject(HttpTestingController);
    const testRequest = testingHttpClient.expectOne(
      `${environment.apiBaseUrl}/ambulance/getPatients?severity=&department=`);

    expect(testRequest.request.method).toBe('GET');
    testRequest.flush({});
    testingHttpClient.verify();
  });
  it('should send post to Wards API hence upserting actual Ward', () => {
    // given
    const ward: WardsModel = {
      id: '1',
      ward: wards.Surgical,
      patientIds: [],
      maxCapacity: 10,
      actualCapacity: 0
    };
    // when
    service.upsertWard(ward).subscribe(_ => {});
    // then
    const testingHttpClient: HttpTestingController = TestBed.inject(HttpTestingController);
    const testRequest = testingHttpClient.expectOne(
      `${environment.apiBaseUrl}/ambulance/upsertWard`);
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush({});
    testingHttpClient.verify();
  });

  it('should send get to Wards API hence getting every ward', () => {
    // given
    // when
    service.getAllWards().subscribe(_ => {});
    // then
    const testingHttpClient: HttpTestingController = TestBed.inject(HttpTestingController);
    const testRequest = testingHttpClient.expectOne(
      `${environment.apiBaseUrl}/ambulance/getWards`);

    expect(testRequest.request.method).toBe('GET');
    testRequest.flush({});
    testingHttpClient.verify();
  });

});
