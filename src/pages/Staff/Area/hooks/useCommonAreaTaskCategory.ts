import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AreaBuildingEnum from 'Services/area/@enums/area.building.enum';
import { AreaServiceResponseAPI } from 'Services/area/@interfaces/area.interfaces';

type AreaTaskType = 'sport' | 'activity' | undefined;
type AllowSport = boolean;
type OnReset = () => void;
type UseCommonAreaCategory = [
  AreaTaskType,
  (e: AreaTaskType) => void,
  AllowSport,
  OnReset,
];

function useCommonAreaTaskCategory(
  pathname: string,
  area: AreaServiceResponseAPI,
): UseCommonAreaCategory {
  const history = useHistory();
  const [areaType, setAreaType] = useState<AreaTaskType>();

  function reset() {
    const correctPath = pathname
      .split('/')
      .slice(0, 4)
      .join('/');
    setAreaType(undefined);
    history.replace(correctPath);
  }

  //pattern pathname test for value sync
  useEffect(() => {
    const homePattern = /\/staff\/area\/\w*$/;

    const onHome = homePattern.test(pathname);
    if (onHome) setAreaType(undefined);

    if (!onHome && !areaType) {
      reset();
    }
  }, [pathname]);

  const allowSport = area.type === AreaBuildingEnum.commonSport;

  return [
    areaType,
    e => {
      if (!areaType) history.push(pathname + '/1');
      setAreaType(e);
    },
    allowSport,
    () => reset(),
  ];
}

export default useCommonAreaTaskCategory;
