import React from 'react';

import PageLayout from '../../components/Layout/Page';
import StateCard from '../../components/StateCard';
import Outline from '../../components/Outline';

// models
import { data as Data } from '../../models/reserve/data';
import Reserve from '../../models/reserve/interface';

// helpers
import OutlineType from './helpers/outline.type';

const MyReservePage: React.FunctionComponent<{
  type: 'wait' | 'history' | 'request';
}> = props => {
  const { type } = props;
  const outline = OutlineType(type);
  const data = Data();
  return (
    <PageLayout titile={'การจองของฉัน'}>
      <Outline>{outline}</Outline>
      {data &&
        data.map((e: Reserve, i) => {
          const { name, reserve } = e;
          return <StateCard key={i} name={name} reserve={reserve} />;
        })}
    </PageLayout>
  );
};

export default MyReservePage;
