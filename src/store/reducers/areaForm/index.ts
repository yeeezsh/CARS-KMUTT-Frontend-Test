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
      return initState;
    default:
      return state;
  }
};

export default AreaFormReducers;
