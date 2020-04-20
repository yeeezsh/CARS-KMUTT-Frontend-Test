import { BuildingType } from 'Models/building/interface';

export const ADD_FORM = 'ADD_FORM';
export const INIT_FORM = 'INIT_FORM';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const FILL_FORM = 'FILL_FORM';
export const SET_FORM_CUR = 'SET_FORM_CUR';
export const SET_AREA_INFO = 'SET_AREA_INFO';

interface AddDataFormAction {
  type: typeof ADD_FORM;
  payload: {};
}
interface InitDataFormAction {
  type: typeof INIT_FORM;
  payload: {
    size: number;
  };
}
interface SetFormCurDataFormAction {
  type: typeof SET_FORM_CUR;
  payload: {
    cur: number;
  };
}
interface SubmitDataFormAction {
  type: typeof SUBMIT_FORM;
}
interface FillDataFormAction {
  type: typeof FILL_FORM;
  payload: EachForm;
}
interface SetAreaInfoFormAction {
  type: typeof SET_AREA_INFO;
  payload: AreaInfo;
}

type AreaInfo = {
  _id: string;
  name: string;
  label: string;
  type: BuildingType;
};

export interface EachForm {
  form: {};
  valid: boolean;
}

export type AreaFormActionTypes =
  | AddDataFormAction
  | InitDataFormAction
  | SubmitDataFormAction
  | FillDataFormAction
  | SetFormCurDataFormAction
  | SetAreaInfoFormAction;

export interface AreaFormState {
  forms: Array<any>;
  canNext: boolean;
  step: number;
  area?: AreaInfo;
}
