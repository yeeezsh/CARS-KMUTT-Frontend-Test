import {
  ADD_FORM,
  AreaFormActionTypes,
  INIT_FORM,
  SUBMIT_FORM,
  EachForm,
  FILL_FORM,
} from './types';

export function addForm(payload: {}): AreaFormActionTypes {
  return {
    type: ADD_FORM,
    payload,
  };
}

export function initForm(payload: { size: number }): AreaFormActionTypes {
  return {
    type: INIT_FORM,
    payload,
  };
}

export function submitForm(): AreaFormActionTypes {
  return {
    type: SUBMIT_FORM,
  };
}

export function fillForm(payload: EachForm): AreaFormActionTypes {
  return {
    type: FILL_FORM,
    payload,
  };
}
