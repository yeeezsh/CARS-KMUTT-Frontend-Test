const OutlineType = (type: string): string => {
  switch (type) {
    case 'wait':
      return 'กำลังดำเนินการ';
    case 'history':
      return 'ประวัติการจอง';
    default:
      return 'รีเควสที่ต้องยืนยัน';
  }
};
export default OutlineType;
