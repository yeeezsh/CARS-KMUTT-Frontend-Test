export const ADD_FORM = 'ADD_FORM';
export const INIT_FORM = 'INIT_FORM';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const FILL_FORM = 'FILL_FORM';
export const SET_FORM_CUR = 'SET_FORM_CUR';

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

export interface EachForm {
  form: {};
  valid: boolean;
}

export type AreaFormActionTypes =
  | AddDataFormAction
  | InitDataFormAction
  | SubmitDataFormAction
  | FillDataFormAction
  | SetFormCurDataFormAction;

export interface AreaFormState {
  forms: Array<{}>;
  canNext: boolean;
  step: number;
  area: {};
}
