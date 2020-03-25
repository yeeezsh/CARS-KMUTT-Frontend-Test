interface Select {
  label: string;
  value: string;
}
export type Department = Select[];
export type Faculty = Array<Select & { departments: Select[] }>;

export const faculties: Faculty = [
  {
    label: 'คณะวิศวกรรมศาสตร์',
    value: 'enginnering',
    departments: [{ label: 'ภาควิชาวิศวกรรมคอมพิวเตอร์', value: 'CPE' }],
  },
  {
    label: 'คณะวิทยาศาสตร์',
    value: 'science',
    departments: [
      {
        label: 'เคมี',
        value: 'CHEM',
      },
    ],
  },
];
