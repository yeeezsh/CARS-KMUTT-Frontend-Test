/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { InputNumber, Row, Col } from 'antd';

// styles
const sharedLabelstyle: React.CSSProperties = {
  color: '#666666',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '22px',
};

const ToggleButton: React.FC<{ onClick: () => void }> = props => (
  <div
    onClick={props.onClick}
    style={{
      padding: 0,
      margin: 0,
      width: '32px',
      height: '32px',
      marginLeft: '4px',
      marginRight: '4px',
      backgroundColor: '#FF682B',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'block',
    }}
  >
    <p
      style={{
        textAlign: 'center',
        verticalAlign: 'center',
        color: '#FFFFFF',
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '32px',
      }}
    >
      {props.children}
    </p>
  </div>
);
const NumberWithToggle = React.forwardRef<
  any,
  { label?: string; unit?: string }
>((props, ref) => {
  const [value, setValue] = useState(10);

  function addValue(n: number) {
    setValue(prev => prev + n);
  }

  return (
    <React.Fragment>
      <Row justify="center" type="flex">
        {/* label */}
        <Col span={13}>
          <span style={sharedLabelstyle}>{props.label}</span>

          <span
            style={{
              ...sharedLabelstyle,
              ...{
                marginLeft: '8px',
                fontSize: '14px',
                fontWeight: 'lighter',
              },
            }}
          >
            ({props.unit})
          </span>
        </Col>

        {/* number */}
        <Col offset={1} span={10}>
          <div style={{ display: 'flex' }}>
            <ToggleButton onClick={() => addValue(-1)}>-</ToggleButton>
            <InputNumber
              style={{
                height: '32px',
                marginBottom: '6px',
                display: 'block',
                width: '65px',
                textAlign: 'center',
              }}
              {...props}
              value={value}
            />
            <ToggleButton onClick={() => addValue(1)}>+</ToggleButton>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
});

export default NumberWithToggle;
