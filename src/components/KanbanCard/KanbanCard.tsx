import { Col, Row } from 'antd';
import defaultMenu from 'Models/kanbanCard';
import Menu from 'Models/kanbanCard/interface';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

export default function KanbanCard(props: {
  menu?: Menu[];
  needActions?: string[];
  callback?: (e: Menu) => void;
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

  function callbackHelper(e: Menu) {
    props.callback && props.callback(e);
  }

  const LinkCard: React.FC<{ e: Menu }> = linkCardProps => {
    const {
      icon,
      label,
      setting,
      key,
      link,
      state,
      style,
    } = linkCardProps.e;
    const CardElement = () => (
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
    );

    if (!linkCardProps.e.link)
      return (
        <Col key={key} span={11}>
          <div onClick={() => callbackHelper(linkCardProps.e)}>
            <CardElement />
          </div>
        </Col>
      );
    return (
      <Col key={key} span={11}>
        <Link
          onClick={() => callbackHelper(linkCardProps.e)}
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
          <CardElement />
        </Link>
      </Col>
    );
  };

  return (
    <React.Fragment>
      <Row type="flex" justify="space-between">
        {menu &&
          menu.map(e => {
            return <LinkCard key={e.key} e={e} />;
          })}
      </Row>
    </React.Fragment>
  );
}
