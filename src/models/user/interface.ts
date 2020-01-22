export interface User {
  _id: string;
  username?: string;
  studentId?: string;
  email?: string;
  permission: string;
  access_token: string;
  Authorization: string;
}
export default User;
