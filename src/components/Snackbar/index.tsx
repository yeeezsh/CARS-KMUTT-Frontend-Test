import React, { Component } from 'react';

import styles from './style.module.css';

export default class Snackbar extends Component<{ show: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: true,
    };
  }
  render() {
    return <div className={styles.snackbar}>{this.props.children}</div>;
  }
}
