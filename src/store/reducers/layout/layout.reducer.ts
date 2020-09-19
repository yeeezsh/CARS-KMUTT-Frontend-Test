import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { setButtonActionLayout } from './layout.action';
import { ButtonActionLayoutPayload, LayoutState } from './layout.type';
const initState: LayoutState = {
  buttonActionLayout: 'base',
};
const layoutReducer = createReducer(initState, {
  [setButtonActionLayout.type]: (
    state,
    action: PayloadAction<ButtonActionLayoutPayload>,
  ) => {
    return {
      ...state,
      buttonActionLayout: action.payload.style,
    };
  },
});
export default layoutReducer;
