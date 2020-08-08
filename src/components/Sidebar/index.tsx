import { Row } from 'antd';
import MainCard from 'Components/AppDrawer/MainCard';
import SubCard from 'Components/AppDrawer/SubCard';
import menu from 'Models/staff/sidebar/constant';
import { logoutIcon, sidebarIcon } from 'Models/staff/sidebar/icon.import';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootReducersType } from 'Store/reducers';
import styles from './styles.module.css';
import UserCard from './UserCard';

const Sidebar: React.FC = () => {
  const username = useSelector(
    (s: RootReducersType) => s.UserReducers.username,
  );

  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <img src={sidebarIcon} alt="sidebar icon" />
        <p>STAFF</p>
      </div>

      {/* menu */}
      <div className={styles.list}>
        {menu &&
          menu.map(({ key, label, icon, settings, sub, link }) => {
            return (
              <React.Fragment key={key}>
                <MainCard
                  label={label}
                  icon={icon}
                  settings={settings}
                  link={link}
                />
                {sub &&
                  sub.map(e => (
                    <SubCard
                      key={key + '.' + e.key}
                      icon={e.icon}
                      link={e.link}
                      settings={e.settings}
                      label={e.label}
                    />
                  ))}
              </React.Fragment>
            );
          })}
      </div>

      {/* logout */}
      <Row
        className={styles.list}
        style={{ position: 'absolute', width: '100%', bottom: 50 }}
      >
        {/* user info */}
        <UserCard>{username}</UserCard>

        {/* trailing spaces */}
        <div style={{ height: '12px' }} />

        {/* logout */}
        <MainCard
          link={'/staff/logout'}
          label={['ออกจากระบบ']}
          icon={logoutIcon}
        />
      </Row>
    </div>
  );
};

export default Sidebar;
