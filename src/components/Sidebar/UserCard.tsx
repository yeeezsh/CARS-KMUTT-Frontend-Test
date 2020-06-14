import React from 'react';

// assets
import UserIcon from 'Assets/icons/drawer/user.svg';

const BoxStyle: React.CSSProperties = {
  width: '208px',
  height: '48px',
  background: '#FFFFFF',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px',
};

const TextStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#FF682B',
  lineHeight: '28px',
};

const IconStyle: React.CSSProperties = {
  padding: '5px',
  marginRight: '12px',
};

const UserCard: React.FC = props => {
  return (
    <div style={BoxStyle}>
      <img style={IconStyle} src={UserIcon} alt="user-icon" />
      <div style={TextStyle}>{props.children}</div>
    </div>
  );
};

export default UserCard;
