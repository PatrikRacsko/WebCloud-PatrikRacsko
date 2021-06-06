import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AmbulanceContextComponent } from './ambulance-context.component';
import {Store} from '@ngrx/store';
import {AmbulanceState} from '../store';
import {EMPTY} from 'rxjs';

const storeStub: Partial<Store<AmbulanceState>> = {
  pipe: () => EMPTY
};

describe('AmbulanceContextComponent', () => {
  let component: AmbulanceContextComponent;
  let fixture: ComponentFixture<AmbulanceContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AmbulanceContextComponent ],
      providers: [{provide: Store, useValue: storeStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulanceContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
