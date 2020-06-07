import moment, { Moment } from 'moment';

export default function(OFFSET_DAY: number) {
  return (current: Moment | null): boolean => {
    return Boolean(
      current &&
        current <
          moment()
            .add(OFFSET_DAY - 1, 'days')
            .endOf('day'),
    );
  };
}
