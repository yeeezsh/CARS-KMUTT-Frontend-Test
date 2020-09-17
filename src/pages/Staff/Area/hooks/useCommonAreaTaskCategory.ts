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
    console.log('home', homePattern.test(pathname));
    if (homePattern.test(pathname)) setAreaType(undefined);
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
