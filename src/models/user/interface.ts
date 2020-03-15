export interface User {
  _id: string;
  username: string;
  studentId?: string;
  email?: string;
  permission: string;
}
export default User;
