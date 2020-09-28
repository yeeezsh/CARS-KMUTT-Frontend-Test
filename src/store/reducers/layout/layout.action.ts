import { createAction } from '@reduxjs/toolkit';
import withPayload from '../common/withPayload';
import {
  ButtonActionLayoutPayload,
  SET_BUTTON_ACTION_LAYOUT,
} from './layout.type';

export const setButtonActionLayout = createAction(
  SET_BUTTON_ACTION_LAYOUT,
  withPayload<ButtonActionLayoutPayload>(),
);
