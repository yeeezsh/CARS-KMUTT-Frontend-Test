export interface QuickTask {
  _id: string;
  key: string;
  username: string;
  state: string;
}
export type QuickTaskAPI = QuickTask[];
