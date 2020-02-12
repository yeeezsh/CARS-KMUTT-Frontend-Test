import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';
import { Drawer } from './drawer.interface';

export default function CardSub(props: {
  settings?: Drawer['settings'];
  icon: Drawer['icon'];
  label: Drawer['label'];
  link?: Drawer['link'];
  onClick?: any;
}) {
  const { label, icon, settings, link, onClick } = props;
  return (
    <Col onClick={onClick} className={styles.sub} span={22}>
      <Link to={link || ''}>
        <Row type="flex" justify="start">
          <Col span={3}>
            <Row type="flex" justify="center">
              <Col>
                <img
                  height={settings?.iconSize || undefined}
                  src={icon}
                  alt={label[0]}
                />
              </Col>
            </Row>
          </Col>
          <Col offset={1} span={19}>
            {label}
          </Col>
        </Row>
      </Link>
    </Col>
  );
}
