import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

const Snackbar: React.FunctionComponent<{
  show?: boolean;
  interval?: number;
}> = props => {
  const { children, show, interval } = props;
  const [showState, setShowState] = useState<boolean>(show || false);

  if (interval) {
    useEffect(() => {
      const trigger = setTimeout(
        () => setShowState(prev => !prev),
        interval,
      );

      return () => clearTimeout(trigger);
    }, []);
  }

  return (
    <div
      className={`${styles.snackbar} ${
        showState ? styles.show : styles.hide
      }`}
    >
      {children}
    </div>
  );
};
export default Snackbar;
