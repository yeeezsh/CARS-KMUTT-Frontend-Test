export interface ActionButtonStyle {
  type?: 'primary' | 'confirm' | 'disabled';
}

export interface ButtonStyleModel {
  color?: string;
  type?: ActionButtonStyle['type'];
  style?: React.CSSProperties;
  fontSize?: number;
  padding?: string | number;
  fontColor?: string;
  margin?: string;
}
