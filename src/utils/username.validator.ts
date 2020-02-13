export default (s: string): boolean => {
  const staffPattern = new RegExp('[A-za-z0-9]{1,}[.]([A-za-z0-9]){1,}');
  const staffTest = staffPattern.test(s);
  if (staffTest) return staffTest;
  const studentPattern = new RegExp('([0-9]){11}');
  const studentTest = studentPattern.test(s);
  if (studentTest) return studentTest;
  return false;
};
