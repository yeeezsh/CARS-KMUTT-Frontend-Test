import redIcon from 'Assets/icons/modal/red.x.svg';
import greenIcon from 'Assets/icons/modal/green.checked.svg';
import yellowIcon from 'Assets/icons/modal/yellow.reject.svg';
import { ConfirmMoalType } from './interface';

const list = [
  {
    type: 'drop',
    icon: redIcon,
    header: 'ท่านต้องการที่จะไม่อนุมัติการจองนี้',
    desc: `เมื่อท่านไม่อนุมัติการจอง นักศึกษา/บุคลากรที่ขอใช้บริการ
          จะไม่สามารถใช้งานสถานที่ในเวลาดังกล่าวได้`,
    btn: {
      bg: '#F5222D',
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
      bg: '#1890FF',
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
      bg: '#52C41A',
      text: 'อนุมัติ',
    },
  },
];

export default (type: ConfirmMoalType) => list.find(f => f.type === type);
