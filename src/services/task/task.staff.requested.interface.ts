import { StaffPermissionType } from 'Services/user/staff.interface';

export interface TaskStaffRequested {
  group: StaffPermissionType;
  id?: string[];
  approve: boolean;
}
