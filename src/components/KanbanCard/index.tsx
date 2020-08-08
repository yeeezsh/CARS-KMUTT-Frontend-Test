import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import defaultMenu from 'Services/menu';
import Menu from 'Services/menu/interface';
import Card from './Card';

export default function KanbanCard(props: {
  menu?: Menu[];
  needActions?: string[];
}) {
  const { needActions } = props;
  let menu = props.menu ? props.menu : defaultMenu;

  // when parse new action
  if (needActions && needActions[0]) {
    menu = menu.map(e => {
      if (needActions.includes(e.key))
        return { ...e, setting: { ...e.setting, needAction: true } };
      return e;
    });
  }

  return (
    <React.Fragment>
      <Row type="flex" justify="space-between">
        {menu &&
          menu.map(({ icon, label, setting, key, link, state, style }) => (
            <Col key={key} span={11}>
              <Link
                to={
                  {
                    pathname: link,
                    state: {
                      ...state,
                      label,
                    },
                  } || ''
                }
              >
                <Card
                  label={label}
                  icon={icon}
                  setting={
                    style === 'center' // if use center styles
                      ? {
                          ...setting,
                          center: true,
                          iconSize: 70,
                          labelColor: '#666666',
                        }
                      : setting
                  }
                />
              </Link>
            </Col>
          ))}
      </Row>
    </React.Fragment>
  );
}
