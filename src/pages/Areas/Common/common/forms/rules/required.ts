import { ValidationRule } from 'antd/lib/form';

export const DEFAULT_REQUIED_MSG = 'กรุณากรอก';

export const DEFAULT_REQUIRED_RULES: ValidationRule = {
  required: true,
  message: DEFAULT_REQUIED_MSG,
};
