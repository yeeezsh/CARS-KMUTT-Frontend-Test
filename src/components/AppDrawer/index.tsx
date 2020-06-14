import React from 'react';
import { Drawer, Row } from 'antd';
// import { Drawer as DrawerType } from 'Models/drawer/interface';

import MainCard from './MainCard';
import SubCard from './SubCard';

import styles from './styles.module.css';
import menu from './data';

import { hamburgerWhite, logoutIcon } from './icon.import';

const AppDrawer: React.FunctionComponent<{
  drawer: boolean;
  onDrawer: () => void;
  header?: React.FunctionComponent;
}> = props => {
  const { drawer, onDrawer, header } = props;
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
      <Row style={{ position: 'absolute', width: '100%', bottom: 50 }}>
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
