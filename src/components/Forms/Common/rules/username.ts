import { ValidationRule } from 'antd/lib/form';
import usernameValidator from 'Utils/username.validator';

function validatorUsernameHelper(
  _rule: any,
  value: string,
  callback: any,
) {
  if (value.length === 0) return callback();

  const valid = usernameValidator(value);
  if (!valid) return callback('โปรดกรอกรหัสผู้ใช้งานให้ถูกต้อง');

  return callback();
}

export const DEFAULT_USERNAME_RULES: ValidationRule = {
  message: 'กรุณากรอกรหัสให้ถูกต้อง',
  validator: validatorUsernameHelper,
};
