import React from 'react';
import { Drawer, Row } from 'antd';
import { Drawer as DrawerType } from 'Models/drawer/interface';

import CardMain from './card.main';
import CardSub from './card.sub';

import styles from './styles.module.css';

import {
  homeIcon,
  basketballIcon,
  footballareaIcon,
  ticketIcon,
  docsIcon,
  checkedIcon,
  timeIcon,
  hamburgerWhite,
  logoutIcon,
} from './icon.import';

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
                <CardMain
                  onClick={onDrawer}
                  label={label}
                  icon={icon}
                  settings={settings}
                  link={link}
                />
                {sub &&
                  sub.map(e => (
                    <CardSub
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
        <CardMain
          link={'/logout'}
          onClick={onDrawer}
          label={['ออกจากระบบ']}
          icon={logoutIcon}
        />
      </Row>
    </Drawer>
  );
};

const menu: DrawerType[] = [
  {
    key: '1',
    label: ['หน้าหลัก'],
    icon: homeIcon,
    link: '/',
  },
  {
    key: '2',
    label: ['จองสนามกีฬา'],
    icon: basketballIcon,
    link: '/reserve/sport/category',
  },
  {
    key: '3',
    label: ['จองพื้นที่จัดกิจกรรม /ห้องประชุม'],
    icon: footballareaIcon,
    link: '/reserve/test',
  },
  {
    key: '4',
    label: ['การจองของฉัน'],
    icon: ticketIcon,
    sub: [
      {
        key: '1',
        label: ['กำลังดำเนินการ'],
        icon: docsIcon,
        link: '/my/reserve/wait',
      },
      {
        key: '2',
        label: ['รีเควสที่ต้องยืนยัน'],
        icon: checkedIcon,
        link: '/my/reserve/requested',
      },
      {
        key: '3',
        label: ['ประวัติการจอง'],
        icon: timeIcon,
        link: '/my/reserve/history',
      },
    ],
  },
];

export default AppDrawer;
