import React, { Component } from 'react';

import PageLayout from '../../components/Layout/Page';
import StateCard from '../../components/StateCard';
import Outline from '../../components/Outline';

// helpers
import OutlineType from './helpers/outline.type';

export default class MyReservePage extends Component<
  { type: 'wait' | 'history' | 'request' },
  {
    type: string;
    outline: string;
  }
> {
  state = { type: '', outline: '' };

  componentDidMount = () => {
    const { type } = this.props;
    const outline = OutlineType(type);
    return this.setState({ type, outline });
  };
  render() {
    const { outline } = this.state;
    return (
      <PageLayout titile={'การจองของฉัน'}>
        <Outline>{outline}</Outline>
      </PageLayout>
    );
  }
}
