import { useEffect, useState } from 'react';

function useWindowResize() {
  const [width, setWidth] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleWidth = () =>
      setWidth({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    window.addEventListener('resize', handleWidth);

    return () => {
      window.removeEventListener('resize', handleWidth);
    };
  });

  return width;
}

export default useWindowResize;
