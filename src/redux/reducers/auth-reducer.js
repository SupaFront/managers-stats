import Notiflix from 'notiflix';
import {
  getCurrentUserTypes,
  loginUserTypes,
  logOutUserTypes,
  registerUserTypes,
} from '../actions/action-types/auth-types';

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
    case registerUserTypes.PENDING:
      return { ...state, isLoading: true, error: null };

    case registerUserTypes.FULFILLED:
      Notiflix.Notify.success('Пользователь успешно зарегистрирован!');
      return { ...state, message: 'Registered', isLoading: false };
    case registerUserTypes.REJECTED:
      return { ...state, isLoading: false, error: payload };

    case loginUserTypes.PENDING:
      return { ...state, isLoading: true, error: null };

    case loginUserTypes.FULFILLED:
      return {
        ...state,
        login: payload.login,
        role: payload.role,
        email: payload.login,
        authorized: true,
        id: payload._id,
        token: payload.token,
      };
    case loginUserTypes.REJECTED:
      Notiflix.Notify.failure('Неверный логин или пароль!');
      return { ...state, isLoading: false, error: payload };

    case logOutUserTypes.PENDING:
      return { ...state, isLoading: true, error: null };

    case logOutUserTypes.FULFILLED:
      return { initialState };
    case logOutUserTypes.REJECTED:
      return { ...state, isLoading: false, error: payload };

    case getCurrentUserTypes.PENDING:
      return { ...state, isLoading: true, error: null };
    case getCurrentUserTypes.FULFILLED:
      return {
        ...state,
        login: payload.login,
        role: payload.role,
        email: payload.login,
        authorized: true,
        id: payload._id,
      };
    case getCurrentUserTypes.REJECTED:
      return { ...state, isLoading: false, error: payload };

    default:
      return { ...state };
  }
};
