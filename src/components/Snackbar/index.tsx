import React from 'react';

import styles from './style.module.css';

const Snackbar: React.FunctionComponent<{ show: boolean }> = props => {
  const { children, show } = props;
  return (
    <div
      className={`${styles.snackbar} ${show ? styles.show : styles.hide}`}
    >
      {children}
    </div>
  );
};
export default Snackbar;
