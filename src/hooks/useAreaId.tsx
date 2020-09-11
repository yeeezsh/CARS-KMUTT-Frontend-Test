import { useLocation } from 'react-router';

function useAreaId(): string {
  const { pathname } = useLocation();
  const areaId = pathname.split('/')[3];
  return areaId;
}

export default useAreaId;
