import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AppointmentComponent } from './appointment.component';
import { RouterTestingModule } from '@angular/router/testing';
import {Store} from '@ngrx/store';
import {AmbulanceState} from '../store';
import {EMPTY} from 'rxjs';
import {Pipe, PipeTransform} from '@angular/core';
const storeStub: Partial<Store<AmbulanceState>> = {
  pipe: () => EMPTY
};

@Pipe({name: 'CalendarDate'})
class CalendarDate implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentComponent, CalendarDate ],
      imports: [ MatDialogModule, RouterTestingModule ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: Store, useValue: storeStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
