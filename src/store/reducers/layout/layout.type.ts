import ButtonActionLayoutType from 'Models/layout/button.action.layout.type';

export type LayoutState = {
  buttonActionLayout: ButtonActionLayoutType;
};

export type ButtonActionLayoutPayload = { style: ButtonActionLayoutType };

export const SET_BUTTON_ACTION_LAYOUT = 'LAYOUT/SET_BUTTON_ACTION_LAYOUT';
