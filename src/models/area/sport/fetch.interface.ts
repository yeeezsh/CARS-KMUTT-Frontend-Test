export interface FetchMenu {
  _id: string;
  name: string;
  label?: string;
  type: 'sport' | 'area';
  createAt: Date;
  updateAt: Date;
}
