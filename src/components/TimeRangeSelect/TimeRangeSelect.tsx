import { DatePicker } from 'antd';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment, { Moment } from 'moment';
import React from 'react';
import calendarCurrent from 'Utils/calendar.current';

const { RangePicker } = DatePicker;
const DATEFORMAT = 'DD/MM/YYYY';

const TimeRangeSelect: React.FC<{
  onSelect: (start: Moment, stop: Moment) => void;
  forward: number;
  now: Moment;
}> = props => {
  console.log(props);
  function onChange(dates: RangePickerValue) {
    const [start, stop] = dates;
    start && stop && props.onSelect(start, stop);
  }
  return (
    <div>
      <RangePicker
        defaultValue={[
          moment(props.now),
          moment(props.now).add(props.forward, 'day'),
        ]}
        disabledDate={calendarCurrent(0)}
        format={DATEFORMAT}
        onChange={onChange}
      />
    </div>
  );
};

export default TimeRangeSelect;
