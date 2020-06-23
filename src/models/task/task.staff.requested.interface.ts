import { StaffPermissionType } from 'Models/user/staff.interface';

export interface TaskStaffRequested {
  group: StaffPermissionType;
  id?: string[];
  approve: boolean;
}
