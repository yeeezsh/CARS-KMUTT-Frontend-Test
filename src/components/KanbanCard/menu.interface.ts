import RouterStates from './states.interface';

export default interface Menu {
  key: string;
  label: string[];
  icon: string;
  link?: string;
  setting?: {
    center?: boolean;
    backgroundColor?: string;
    labelColor?: string;
    iconSize?: number;
  };
  state?: RouterStates;
}
