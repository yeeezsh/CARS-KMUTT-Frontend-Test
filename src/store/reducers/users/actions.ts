export const SET_USER = 'SET_USER';

export const setUser = (data: any) => {
  return {
    type: SET_USER,
    ...data,
  };
};
