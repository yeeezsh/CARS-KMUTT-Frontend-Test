import {
  ADD_FORM,
  AreaFormActionTypes,
  INIT_FORM,
  SUBMIT_FORM,
  EachForm,
  FILL_FORM,
  AreaInfo,
  SET_AREA_INFO,
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
export function setAreaInfoForm(area: AreaInfo): AreaFormActionTypes {
  return {
    type: SET_AREA_INFO,
    payload: area,
  };
}
