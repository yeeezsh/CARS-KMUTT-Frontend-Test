interface Select {
  label: string;
  value: string;
}
export type Department = Select[];
export type Faculty = Array<Select & { departments: Select[] }>;

export const faculties: Faculty = [
  {
    label: 'คณะวิศวกรรมศาสตร์',
    value: 'คณะวิศวกรรมศาสตร์',
    departments: [
      {
        label: 'ภาควิชาวิศวกรรมคอมพิวเตอร์',
        value: 'ภาควิชาวิศวกรรมคอมพิวเตอร์',
      },
    ],
  },
  {
    label: 'คณะวิทยาศาสตร์',
    value: 'คณะวิทยาศาสตร์',
    departments: [
      {
        label: 'เคมี',
        value: 'เคมี',
      },
    ],
  },
];
