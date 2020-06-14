import { AreaFormActionTypes, AreaFormReducer } from './types';

const initState: AreaFormReducer = {
  forms: [],
  canNext: false,
  step: 0,
  finish: false,
};

export const AreaFormReducers = (
  state = initState,
  action: AreaFormActionTypes,
): AreaFormReducer => {
  switch (action.type) {
    case 'ADD_FORM':
      return state;
    case 'INIT_FORM':
      console.log('preparing area form from reducers');
      return {
        ...initState,
        step: 0,
        forms: Array(action.payload.size).fill({}),
      };
    case 'SUBMIT_FORM':
      if (state.canNext) {
        state.step = state.step + 1;
        state.canNext = false;
      }
      return state;
    case 'FILL_FORM':
      const curForm = state.step;
      const parsed: AreaFormReducer = {
        ...state,
        canNext: action.payload.valid,
        forms: state.forms.map((e, i) =>
          i === curForm ? action.payload.form : e,
        ),
      };
      return parsed;
    case 'SET_FORM_CUR':
      return {
        ...state,
        step: action.payload.cur,
      };
    case 'SET_AREA_INFO':
      return { ...state, area: action.payload };
    case 'FINISH_FORM':
      return { ...state, finish: true };
    default:
      return state;
  }
};

export default AreaFormReducers;
