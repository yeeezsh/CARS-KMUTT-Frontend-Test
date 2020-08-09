export type ConfirmMoalType = 'accept' | 'reject' | 'drop' | 'forward';
export interface ConfirmModalTemplate {
  type: ConfirmMoalType;
  icon?: string;
  header: string;
  desc: string;
  btn: {
    bg: string;
    text: string;
  };
}
