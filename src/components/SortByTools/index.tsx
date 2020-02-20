import React from 'react';
import { Select } from 'antd';
import styles from './styles.module.css';

const { Option } = Select;

type OnSelectedType = 'createAt' | '_id' | 'type' | 'area' | 'state' | any;

const SortByTools: React.FunctionComponent<{
  onSelected?: (s: OnSelectedType) => void;
}> = props => {
  return (
    <Select
      className={styles.selector}
      {...props}
      placeholder="Sort by"
      onSelect={e => props.onSelected && props.onSelected(e)}
      dropdownClassName={styles.dropdown}
      dropdownMenuStyle={{ borderRadius: '25px' }}
    >
      <Option value="createAt">วันที่</Option>
      <Option value="_id">รหัสการจอง</Option>
      <Option value="type">ประเภทการจอง</Option>
      <Option value="area">สถานที่</Option>
      <Option value="state">สถานะ</Option>
    </Select>
  );
};

export default SortByTools;
