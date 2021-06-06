import { Component, OnInit } from '@angular/core';
import {loadPatientsInit} from '../store/patients-model/patients-model.actions';
import {Store} from '@ngrx/store';
import {AmbulanceState} from '../store';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  surgical = false;
  trauma = false;
  pediatric = false;
  longTerm = false;
  low = false;
  medium = false;
  high = false;
  constructor(private store: Store<AmbulanceState>) { }

  ngOnInit(): void {
  }
  mapDepartments(key: string): string {
    switch (key) {
      case 'surgical':
        return '1';
      case 'trauma':
        return '3';
      case 'pediatric':
        return '4';
      case 'longTerm':
        return '2';
      default:
        return '';
    }
  }
  handleFilter(): void {
    const departments = {surgical: this.surgical, trauma: this.trauma, pediatric: this.pediatric, longTerm: this.longTerm };
    const severities = {low: this.low, medium: this.medium, high: this.high };
    const depFilter = Object.keys(departments).map((key) => {
      // @ts-ignore
      if (departments[key] !== false) {
        return this.mapDepartments(key);
      }
      return;
    }).filter(Boolean);
    const sevFilter = Object.keys(severities).map(key => {
      // @ts-ignore
      if (severities[key] !== false) {
        return key;
      }
      return;
    }).filter(Boolean);
    this.store.dispatch(loadPatientsInit({deps: depFilter, sevs: sevFilter}));
  }

}
