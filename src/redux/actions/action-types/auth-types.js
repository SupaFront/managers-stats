export const registerUserTypes = {
  PENDING: 'auth/register_START',
  FULFILLED: 'auth/register_SUCCESS',
  REJECTED: 'auth/register_FAILURE',
};

export const loginUserTypes = {
  PENDING: 'auth/login_START',
  FULFILLED: 'auth/login_SUCCESS',
  REJECTED: 'auth/login_FAILURE',
};

export const logOutUserTypes = {
  PENDING: 'auth/logout_START',
  FULFILLED: 'auth/logout_SUCCESS',
  REJECTED: 'auth/logout_FAILURE',
};

export const getCurrentUserTypes = {
  PENDING: 'auth/getCurrent_START',
  FULFILLED: 'auth/getCurrent_SUCCESS',
  REJECTED: 'auth/getCurrent_FAILURE',
};

export const getManagersTypes = {
  PENDING: 'auth/getManagers_START',
  FULFILLED: 'auth/getManagers_SUCCESS',
  REJECTED: 'auth/getManagers_FAILURE',
};
