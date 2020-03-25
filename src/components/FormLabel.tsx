import React from 'react';

const FormLabel: React.FC<{ step: number }> = props => {
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          background: '#FDE3D4',
          width: 125,
          fontSize: 16,
          color: '#FF682B',
          padding: 6,
          paddingLeft: 64,
          position: 'absolute',
          left: -65,
          marginRight: 12,
        }}
      >
        ส่วนที่ {props.step}
      </div>
      <p
        style={{
          marginLeft: 84,
          //   marginTop: 24,
          lineHeight: '36px',
          fontSize: 18,
          color: '#FF682B',
        }}
      >
        {props.children}
      </p>
    </div>
  );
};

export default FormLabel;
