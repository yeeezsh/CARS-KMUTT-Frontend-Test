import moment from 'moment';
import TimeAreaReserveType from '../area/time.interface';
import StepsType from '../../components/StateSteps/step.interface';

const areas: TimeAreaReserveType['areas'] = [
  {
    time: {
      start: moment().startOf('hour'),
      stop: moment()
        .startOf('hour')
        .add(12, 'hour'),
      disabled: [
        {
          value: moment()
            .startOf('hour')
            .add(1, 'hour'),
        },
      ],
    },
    area: {
      label: 'สนามฟุตบอล 1',
      id: '1',
      required: 1,
    },
  },
  {
    time: {
      start: moment().startOf('hour'),
      stop: moment()
        .startOf('hour')
        .add(12, 'hour'),
      interval: 120,
      disabled: [
        {
          value: moment()
            .startOf('hour')
            .add(1, 'hour'),
        },
        {
          value: moment()
            .startOf('hour')
            .add(4, 'hour'),
        },
      ],
    },
    area: {
      label: 'สนามฟุตบอล 2',
      id: '2',
      required: 10,
    },
  },
  {
    time: {
      start: moment().startOf('hour'),
      stop: moment()
        .startOf('hour')
        .add(12, 'hour'),
      interval: 120,
      disabled: [
        {
          value: moment()
            .startOf('hour')
            .add(1, 'hour'),
        },
        {
          value: moment()
            .startOf('hour')
            .add(4, 'hour'),
        },
      ],
    },
    area: {
      label: 'สนามฟุตบอล 3',
      id: '2',
      required: 2,
    },
  },
];

const stepLists: StepsType[] = [
  {
    label: '1',
  },
  {
    label: '2',
  },
  {
    label: '3',
  },
];

export { stepLists, areas };
