import { useEffect, useState } from 'react';

export default (
  current: any,
  size: any,
  orderCol: any,
  order: any,
): boolean => {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    if (current && size && orderCol && order != undefined) {
      setReady(true);
      console.log('ready');
    }
  }, [current, size, orderCol, order]);

  return ready;
};
