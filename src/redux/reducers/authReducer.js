import { setToken, unsetToken } from '../../utils/tokenActs';

const initialState = {
  login: '',
  email: '',
  id: '',
  role: '',
  authorized: '',
  token: null,
  message: '',
  isLoading: false,
  error: null,
};

export const usersAsyncReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'users/register_START':
      return { ...state, isLoading: true, error: null };

    case 'users/register_SUCCESS':
      return { ...state, message: 'Registered', isLoading: false };
    case 'users/register_FAILURE':
      return { ...state, isLoading: false, error: payload };

    case 'users/login_START':
      return { ...state, isLoading: true, error: null };

    case 'users/login_SUCCESS':
      setToken(payload.token);
      return {
        ...state,
        login: payload.login,
        role: payload.role,
        email: payload.login,
        authorized: true,
        id: payload._id,
        token: payload.token,
      };
    case 'users/login_FAILURE':
      return { ...state, isLoading: false, error: payload };

    case 'users/logout_START':
      return { ...state, isLoading: true, error: null };

    case 'users/logout_SUCCESS':
      unsetToken();
      return { initialState };
    case 'users/logout_FAILURE':
      return { ...state, isLoading: false, error: payload };

    case 'users/getCurrent_START':
      return { ...state, isLoading: true, error: null };
    case 'users/getCurrent_SUCCESS':
      return {
        ...state,
        login: payload.login,
        role: payload.role,
        email: payload.login,
        authorized: true,
        id: payload._id,
      };
    case 'users/getCurrent_FAILURE':
      return { ...state, isLoading: false, error: payload };

   
    default:
      return { ...state };
  }
};
