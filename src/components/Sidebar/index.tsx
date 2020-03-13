import React from 'react';

import { Drawer } from 'Models/drawer/interface';
import styles from './styles.module.css';
import {
  docsIcon,
  allDocs,
  rejectDocs,
  acceptDocs,
  dropDocs,
  sidebarIcon,
  logoutIcon,
  calendarIcon,
} from './icon.import';
import CardMain from 'Components/AppDrawer/card.main';
import CardSub from 'Components/AppDrawer/card.sub';
import { Row } from 'antd';

const menu: Drawer[] = [
  {
    key: '0',
    label: ['ตารางการจอง'],
    icon: calendarIcon,
    link: '/staff/calendar',
  },
  {
    key: '1',
    label: ['รายการทั้งหมด'],
    icon: allDocs,
    link: '/staff',
    sub: [
      {
        key: '1',
        label: ['รอดำเนินการ'],
        icon: docsIcon,
        link: '/staff/wait',
      },
      {
        key: '2',
        label: ['ตีกลับ'],
        icon: rejectDocs,
        link: '/staff/reject',
      },
      {
        key: '3',
        label: ['อนุมัติ'],
        icon: acceptDocs,
        link: '/staff/accept',
      },
      {
        key: '4',
        label: ['ไม่อนุมัติ'],
        icon: dropDocs,
        link: '/staff/drop',
      },
    ],
  },
];

function Sidebar() {
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
                <CardMain
                  label={label}
                  icon={icon}
                  settings={settings}
                  link={link}
                />
                {sub &&
                  sub.map(e => (
                    <CardSub
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
        <CardMain
          link={'/staff/logout'}
          label={['ออกจากระบบ']}
          icon={logoutIcon}
        />
      </Row>
    </div>
  );
}

export default Sidebar;
