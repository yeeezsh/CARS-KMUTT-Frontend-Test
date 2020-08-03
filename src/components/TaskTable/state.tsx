import React from 'react';

const State: React.FC<{ state?: string }> = props => {
  const mainStyle: React.CSSProperties = {
    fontWeight: 'bold',
  };
  const { state } = props;
  switch (state) {
    case 'accept':
      return <p style={{ ...mainStyle, color: '#52C41A' }}>อนุมัติ</p>;
    case 'reject':
      return <p style={{ ...mainStyle, color: '#F5222D' }}>ไม่อนุมัติ</p>;
    case 'drop':
      return <p style={{ ...mainStyle, color: '#F5222D' }}>ไม่อนุมัติ</p>;
    case 'wait':
      return (
        <p style={{ ...mainStyle, color: '#1890FF' }}>รอการอนุมัติ</p>
      );
    case 'forward':
      return <p style={{ ...mainStyle, color: '#1890FF' }}>รอการส่งต่อ</p>;
    case 'requested':
      return (
        <p style={{ ...mainStyle, color: '#1890FF' }}>
          รอการอนุมัติจากเพื่อน
        </p>
      );
  }
  return <div></div>;
};

export default State;
