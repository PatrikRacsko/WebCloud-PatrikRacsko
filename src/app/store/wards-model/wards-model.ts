export enum wards {
  Surgical = 'Surgical',
  TraumaSurgery = 'Trauma Surgery',
  Pediatric = 'Pediatric',
  LongTerm = 'Long term sick'
}
// '1' Surgical, '3' TraumSurgery, '4' Pediatric, '2' Long term sick
export interface WardsModel {
  id: string | undefined;
  ward: wards;
  patientIds: string[];
  maxCapacity: number;
  actualCapacity: number;
}
