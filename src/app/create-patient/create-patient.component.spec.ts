import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatientComponent } from './create-patient.component';
import {Store} from '@ngrx/store';
import {AmbulanceState} from '../store';
import {EMPTY} from 'rxjs';

const storeStub: Partial<Store<AmbulanceState>> = {
  pipe: () => EMPTY
};

describe('CreatePatientComponent', () => {
  let component: CreatePatientComponent;
  let fixture: ComponentFixture<CreatePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePatientComponent ],
      providers: [{provide: Store, useValue: storeStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
