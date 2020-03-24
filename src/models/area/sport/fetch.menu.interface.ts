export interface FetchMenu {
  _id: string;
  name: string;
  label?: string;
  type: 'sport' | 'area' | 'common' | 'meeting';
  createAt: Date;
  updateAt: Date;
}
