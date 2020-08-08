import { Drawer, Row } from 'antd';
import { hamburgerWhite, logoutIcon } from 'Models/appDrawer/icon';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootReducersType } from 'Store/reducers';
import menu from '../../models/appDrawer/constant';
import MainCard from './MainCard';
import styles from './styles.module.css';
import SubCard from './SubCard';
import UserCard from './UserCard';

const AppDrawer: React.FunctionComponent<{
  drawer: boolean;
  onDrawer: () => void;
  header?: React.FunctionComponent;
}> = props => {
  const { drawer, onDrawer, header } = props;
  const username = useSelector(
    (select: RootReducersType) => select.UserReducers.username,
  );

  console.log('appdrawer ', username);

  return (
    <Drawer
      placement={'left'}
      closable={false}
      maskClosable={true}
      onClose={onDrawer}
      visible={drawer}
      drawerStyle={{ backgroundColor: '#FF682B' }}
    >
      {header || (
        <img
          onClick={props.onDrawer}
          src={hamburgerWhite}
          alt="hamburger"
        />
      )}

      {/* menu */}
      <Row className={styles.container} type="flex" justify="space-around">
        {menu &&
          menu.map(({ key, label, icon, settings, sub, link }) => {
            return (
              <React.Fragment key={key}>
                <MainCard
                  onClick={onDrawer}
                  label={label}
                  icon={icon}
                  settings={settings}
                  link={link}
                />
                {sub &&
                  sub.map(e => (
                    <SubCard
                      onClick={onDrawer}
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
      </Row>

      {/* logout */}
      <Row style={{ position: 'absolute', width: '90%', bottom: 80 }}>
        <UserCard>{username}</UserCard>

        {/* trailing spaces */}
        <div style={{ height: '12px' }} />

        {/* logout */}
        <MainCard
          link={'/logout'}
          onClick={onDrawer}
          label={['ออกจากระบบ']}
          icon={logoutIcon}
        />
      </Row>
    </Drawer>
  );
};

export default AppDrawer;
