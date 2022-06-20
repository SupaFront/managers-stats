import {
  registerUserTypes,
  logOutUserTypes,
  loginUserTypes,
  getCurrentUserTypes,
  getManagersTypes,
} from '../actions/action-types/auth-types';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getManagers,
} from '../../API/fetchUsers';
import { setToken, unsetToken } from '../../utils/tokenActs';

export const registerUserAsyncActions = req => async dispatch => {
  dispatch({ type: registerUserTypes.PENDING });
  try {
    const payload = await registerUser(req);
    dispatch({ type: registerUserTypes.FULFILLED, payload });
  } catch (err) {
    dispatch({ type: registerUserTypes.REJECTED, payload: err });
  }
};
export const loginUserAsyncActions = req => async dispatch => {
  dispatch({ type: loginUserTypes.PENDING });
  try {
    const payload = await loginUser(req);
    dispatch({ type: loginUserTypes.FULFILLED, payload });
  } catch (err) {
    dispatch({ type: loginUserTypes.REJECTED, payload: err });
  }
};

export const logoutAsyncActions = req => async dispatch => {
  dispatch({ type: logOutUserTypes.PENDING });
  try {
    const payload = await logoutUser();
    dispatch({ type: logOutUserTypes.FULFILLED, payload });
    unsetToken();
  } catch (err) {
    dispatch({ type: logOutUserTypes.REJECTED, payload: err });
  }
};

export const getCurrentUserAsyncActions = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  token && setToken(token);
  dispatch({ type: getCurrentUserTypes.PENDING });
  try {
    const payload = await getCurrentUser();
    dispatch({ type: getCurrentUserTypes.FULFILLED, payload });
  } catch (err) {
    dispatch({ type: getCurrentUserTypes.REJECTED, payload: err });
  }
};

export const getManagersAsyncActions = () => async dispatch => {
  dispatch({ type: getManagersTypes.PENDING });
  try {
    const payload = await getManagers();
    dispatch({ type: getManagersTypes.FULFILLED, payload });
  } catch (err) {
    dispatch({ type: getManagersTypes.REJECTED, payload: err });
  }
};
