import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Store} from '@ngrx/store';
import {AmbulanceState} from '../store';
import { FilterComponent } from './filter.component';
import {EMPTY} from 'rxjs';

const storeStub: Partial<Store<AmbulanceState>> = {
  pipe: () => EMPTY
};

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      providers: [{provide: Store, useValue: storeStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
