import { AreaFormActionTypes, AreaFormState } from './types';

const initState: AreaFormState = {
  forms: [],
  canNext: false,
  step: 0,
  area: {},
};

export const AreaFormReducers = (
  state = initState,
  action: AreaFormActionTypes,
): AreaFormState => {
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
      const parsed: AreaFormState = {
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
    default:
      return state;
  }
};

export default AreaFormReducers;
