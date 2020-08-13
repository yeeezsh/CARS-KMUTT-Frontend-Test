import {
  ConfirmMoalType,
  ConfirmModalTemplate,
} from 'Models/confirmModal/interface';
import bgConfirmColor from './bgColor.type';
import { forwardIcon, greenIcon, redIcon, yellowIcon } from './icon';

const list: ConfirmModalTemplate[] = [
  {
    type: 'drop',
    icon: redIcon,
    header: 'ท่านต้องการที่จะไม่อนุมัติการจองนี้',
    desc: `เมื่อท่านไม่อนุมัติการจอง นักศึกษา/บุคลากรที่ขอใช้บริการ
          จะไม่สามารถใช้งานสถานที่ในเวลาดังกล่าวได้`,
    btn: {
      bg: bgConfirmColor.Red,
      text: 'ไม่อนุมัติ',
    },
  },
  {
    type: 'reject',
    icon: yellowIcon,
    header: 'ท่านต้องการตีกลับการจองนี้',
    desc: `เมื่อท่านตีกลับการจอง นักศึกษา/บุคลากรที่ขอใช้บริการ
      จะสามารถแก้ไขข้อมูลการขอใช้บริการได้`,
    btn: {
      bg: bgConfirmColor.Yellow,
      text: 'ตีกลับ',
    },
  },
  {
    type: 'accept',
    icon: greenIcon,
    header: 'ท่านต้องการอนุมัติการจองนี้',
    desc: `เมื่อท่านอนุมัติการจอง นักศึกษา/บุคลากรที่ขอใช้บริการ
      จะสามารถใช้สถานที่ ทำกิจกรรมตามที่ระบุไว้ในการจอง ณ วันเวลาดังกล่าวได้`,
    btn: {
      bg: bgConfirmColor.Green,
      text: 'อนุมัติ',
    },
  },
  {
    type: 'forward',
    icon: forwardIcon,
    header: 'ท่านต้องการส่งต่อการจองนี้',
    desc: `เมื่อท่านอนุมัติการจอง นักศึกษา/บุคลากรที่ขอใช้บริการ
      จะสามารถใช้สถานที่ ทำกิจกรรมตามที่ระบุไว้ในการจอง ณ วันเวลาดังกล่าวได้`,
    btn: {
      bg: '#1890FF',
      text: 'ส่งต่อ',
    },
  },
];

export default (type: ConfirmMoalType) => list.find(f => f.type === type);
