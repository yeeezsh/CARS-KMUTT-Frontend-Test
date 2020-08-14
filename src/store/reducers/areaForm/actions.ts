import {
  ADD_FORM,
  AreaFormActionTypes,
  AreaInfo,
  EachForm,
  FILL_FORM,
  FINISH_FORM,
  INIT_FORM,
  SET_AREA_INFO,
  SET_FORM_CUR,
  SUBMIT_FORM,
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

export function finishFormAction(): AreaFormActionTypes {
  return { type: FINISH_FORM };
}
export function setFormCurrentIndex(n: number): AreaFormActionTypes {
  return { type: SET_FORM_CUR, payload: { cur: n } };
}
