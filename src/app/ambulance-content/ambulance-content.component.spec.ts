import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AmbulanceState } from '../store';
import { EMPTY } from 'rxjs';
import { AmbulanceContentComponent } from './ambulance-content.component';
import { RouterTestingModule } from '@angular/router/testing';


const storeStub: Partial<Store<AmbulanceState>> = {
  pipe: () => EMPTY,
  dispatch: () => EMPTY
};

describe('AmbulanceContentComponent', () => {
  let component: AmbulanceContentComponent;
  let fixture: ComponentFixture<AmbulanceContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AmbulanceContentComponent ],
      providers: [{provide: Store, useValue: storeStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulanceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
