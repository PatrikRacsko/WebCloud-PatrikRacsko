import {Time} from '@angular/common';
export enum severities {
    low = 'Low',
    medium = 'Medium',
    high = 'High'
}

export interface PatientModel {
    id: string | undefined;
    name: string | null;
    disease: string | null;
    diseaseSeverity: severities | null;
    isHospitalized: boolean;
    hospitalWard: Array<string> | null;
    appointmentDate: string | null;
    appointmentTimeStart: string | null;
    appointmentTimeEnd: string | null;
}
