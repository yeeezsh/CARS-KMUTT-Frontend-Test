import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AreaBuildingEnum from 'Services/area/@enums/area.building.enum';
import { AreaServiceResponseAPI } from 'Services/area/@interfaces/area.interfaces';

type AreaTaskType = 'sport' | 'activity' | undefined;
type AllowSport = boolean;
type UseCommonAreaCategory = [
  AreaTaskType,
  (e: AreaTaskType) => void,
  AllowSport,
];

function useCommonAreaTaskCategory(
  pathname: string,
  area: AreaServiceResponseAPI,
): UseCommonAreaCategory {
  const history = useHistory();
  const [areaType, setAreaType] = useState<AreaTaskType>();

  //pattern pathname test for value sync
  useEffect(() => {
    const homePattern = /\/staff\/area\/\w*$/;

    const onHome = homePattern.test(pathname);
    if (onHome) setAreaType(undefined);

    if (!onHome && !areaType) {
      const correctPath = pathname
        .split('/')
        .slice(0, 4)
        .join('/');
      setAreaType(undefined);
      history.replace(correctPath);
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
  ];
}

export default useCommonAreaTaskCategory;
