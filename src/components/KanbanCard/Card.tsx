import React from 'react';
import { Col, Row } from 'antd';
import styles from './card.module.css';
import Menu from './menu.interface';

export default function Card(props: { icon?: string; label: Array<string>; setting?: Menu['setting'] }) {
  const { label, icon, setting } = props;
  return (
    <div
      style={{
        backgroundColor: setting?.backgroundColor,
        height: setting?.center ? 200 : undefined,
        paddingTop: setting?.center ? 25 : undefined,
      }}
      className={styles.card}
    >
      <div className={styles.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: setting?.center ? 'center' : undefined,
          }}
        >
          <img
            style={{
              height: setting?.iconSize || 55,
            }}
            src={icon}
            alt={label[0]}
          />
        </div>
        {!setting?.center ? (
          <p
            style={{
              display: 'flex',
              color: setting?.labelColor || undefined,
            }}
            className={styles.label}
          >
            {' '}
            {label[0]}
          </p>
        ) : (
          <Row style={{ marginTop: 18 }} type="flex" justify="center">
            {label.map((e, i) => {
              return (
                <Col
                  className={i === 0 ? styles.labelMain : styles.labelSub}
                  key={i}
                  style={{ textAlign: 'center' }}
                  span={24}
                >
                  {e}
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
}
