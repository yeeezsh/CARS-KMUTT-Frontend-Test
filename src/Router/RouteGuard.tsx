import i from 'Models/axios.interface';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const TOKEN_VALIDATION_URL = '/users/auth/requestor';
const LOGIN_URL = '/login';

const RouteGuard: React.FC<{ defaultRoute?: string }> = props => {
  const [valid, setValid] = useState<boolean>(true);

  //on start
  useEffect(() => {
    i.instance
      .get(TOKEN_VALIDATION_URL)
      .then(() => {
        setValid(true);
      })
      .catch(() => {
        setValid(false);
      });
  }, []);

  if (!valid) {
    const history = useHistory();
    history.replace(props.defaultRoute || LOGIN_URL);
  }

  return <>{props.children}</>;
};

export default RouteGuard;
