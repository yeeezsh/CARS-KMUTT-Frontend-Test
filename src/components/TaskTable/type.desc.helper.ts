export default (type?: 'sport' | 'area' | 'meeting' | string) => {
  switch (type) {
    case 'area':
      return 'พื้นที่ส่วนกลาง';
    case 'sport':
      return 'สนามกีฬา';
    case 'meeting':
      return 'ห้องประชุม';
    default:
      'ไม่ระบุ';
  }
  return 'ไม่ระบุ';
};
