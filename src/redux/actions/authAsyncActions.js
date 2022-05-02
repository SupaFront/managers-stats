export const registerUserAsyncActions = {
  pending: () => ({
    type: 'users/register_START',
  }),
  fulfilled: data => ({
    type: 'users/register_SUCCESS',
    payload: data,
  }),
  rejected: error => ({
    type: 'users/register_FAILURE',
    payload: error,
  }),
};

export const loginUserAsyncActions = {
  pending: () => ({
    type: 'users/login_START',
  }),
  fulfilled: data => ({
    type: 'users/login_SUCCESS',
    payload: data,
  }),
  rejected: error => ({
    type: 'users/login_FAILURE',
    payload: error,
  }),
};

export const logoutAsyncActions = {
  pending: () => ({
    type: 'users/logout_START',
  }),
  fulfilled: data => ({
    type: 'users/logout_SUCCESS',
  }),
  rejected: error => ({
    type: 'users/logout_FAILURE',
    payload: error,
  }),
};

export const getCurrentUserAsyncActions = {
  pending: () => ({
    type: 'users/getCurrent_START',
  }),
  fulfilled: data => ({
    type: 'users/getCurrent_SUCCESS',
    payload: data,
  }),
  rejected: error => ({
    type: 'users/getCurrent_FAILURE',
    payload: error,
  }),
};

export const getManagersAsyncActions = {
  pending: () => ({
    type: 'users/getManagers_START',
  }),
  fulfilled: data => ({
    type: 'users/getManagers_SUCCESS',
    payload: data,
  }),
  rejected: error => ({
    type: 'users/getManagers_FAILURE',
    payload: error,
  }),
};
