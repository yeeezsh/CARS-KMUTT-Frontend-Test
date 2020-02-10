export const SET_USER = 'SET_USER';
export const DELETE_USER = 'DELETE_USER';

export const setUser = (data: any) => {
  return {
    type: SET_USER,
    user: data,
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER,
  };
};
