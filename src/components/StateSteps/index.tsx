import React from 'react';
import { Row, Col } from 'antd';
import StepsType from './step.interface';

import styles from './styles.module.css';

type DotSize = 's' | 'm';

const dotStyle = (
  styles?: 'passed' | 'current' | 'next',
  size?: DotSize,
): React.CSSProperties => {
  let defaultDotStyle: React.CSSProperties = {
    color: '#dadada',
  };
  if (size === 's') {
    defaultDotStyle = {
      ...defaultDotStyle,
      width: '30px',
      height: '30px',
      marginTop: '-14px',
    };
  }

  switch (styles) {
    case 'passed':
      return {
        ...defaultDotStyle,
        backgroundColor: '#FF682B',
        color: '#FFFFFF',
      };
    case 'current':
      return {
        ...defaultDotStyle,
        backgroundColor: '#1890FF',
        fontWeight: 'bold',
        color: '#FFFFFF',
      };
    default:
      return defaultDotStyle;
  }
};

const labelStyle = (size?: DotSize): React.CSSProperties => {
  if (size === 's')
    return {
      fontSize: '14px',
      lineHeight: '12px',
    };
  return {};
};

const StateSteps: React.FunctionComponent<{
  steps: StepsType[];
  current: number;
  onClick?: any;
  size?: DotSize;
}> = props => {
  const { size } = props;
  const { steps, current, onClick } = props;
  return (
    <React.Fragment>
      <div className={styles.dash} />
      <Row
        className={styles.container}
        type="flex"
        justify={'space-between'}
      >
        {steps.map((e, i) => {
          let dot: 'next' | 'current' | 'passed' = 'next';
          if (i < current) dot = 'passed';
          if (i === current) dot = 'current';
          return (
            <Col
              onClick={() => onClick(i + 1)}
              key={i}
              className={styles.dot}
              span={2}
              style={dotStyle(dot, size)}
            >
              <p className={styles.label} style={labelStyle(size)}>
                {e.label}
              </p>
            </Col>
          );
        })}
      </Row>
    </React.Fragment>
  );
};

export default StateSteps;
