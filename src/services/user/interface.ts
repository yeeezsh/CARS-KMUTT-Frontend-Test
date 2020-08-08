import { StaffPermissionType } from './staff.interface';

export interface User {
  _id: string;
  username: string;
  studentId?: string;
  email?: string;
  group: string | StaffPermissionType;
}
export default User;
