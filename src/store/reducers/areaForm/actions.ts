import { ADD_FORM, AreaFormActionTypes, INIT_FORM } from './types';

export function addForm(payload: {}): AreaFormActionTypes {
  return {
    type: ADD_FORM,
    payload,
  };
}

export function initForm(): AreaFormActionTypes {
  return {
    type: INIT_FORM,
  };
}
