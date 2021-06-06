import { createAction, props} from '@ngrx/store';
import { WardsModel} from './wards-model';

export const upsertWard = createAction(
  '[WardModel] Upsert ward',
  props<{ ward: WardsModel}>()
);

export const loadWards = createAction(
  '[WardModel] Load wards from WardModel',
  props<{ wardModels: WardsModel[] }>()
);

export const loadWardsInit = createAction(
  '[WardModel] Load wards from Service'
);

export const setSelectedWard = createAction(
  '[WardModel] Set selected ward',
  props<{ selectedWard: WardsModel}>()
);
