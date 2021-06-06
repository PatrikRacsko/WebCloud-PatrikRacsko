import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import {AmbulanceState, WardsState} from './store';
import { EMPTY } from 'rxjs';

const storeStub: Partial<Store<AmbulanceState>> = {
  pipe: () => EMPTY
};

const storeStubWards: Partial<Store<WardsState>> = {
  pipe: () => EMPTY
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: Store, useValue: storeStub},
        {provide: Store, useValue: storeStubWards}
      ]
    }).compileComponents();
  });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'ambulance-project'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('ambulance-project');
  // });
});
