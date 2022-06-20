import { convertDateToString } from '../../utils/convertDateToString';
import { getManagersTypes, registerUserTypes } from '../actions/action-types/auth-types';
import {
  chooseNameType,
  logInType,
  openModalType,
  closeModalType,
  prepareForEditType,
  prepareforDeleteType,
  setDateType,
} from '../actions/action-types/ops-types';

const initialState = {
  name: '',
  result: '',
  additional: '',
  selected: false,
  authorized: false,
  isModalOpen: false,
  warningText: '',
  modalType: null,
  managers: [],
};

export const opsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case chooseNameType:
      return { ...state, ...payload, selected: true };

    case logInType:
      return { ...state, authorized: true };

    case openModalType:
      return {
        ...state,
        isModalOpen: true,
      };
    case closeModalType:
      return {
        ...state,
        isModalOpen: false,
        warningText: '',
        modalType: '',
      };
    case prepareForEditType:
      return {
        ...state,
        warningText: `Вы уверены, что хотите изменить запись менеджера ${
          payload.owner.login
        } за ${convertDateToString(payload.createdAt)}?`,
        modalType: 'edit',
        name: payload.name,
      };

    case prepareforDeleteType:
      return {
        ...state,
        warningText: `Вы уверены, что хотите удалить запись менеджера ${
          payload.owner.login
        } за ${convertDateToString(payload.createdAt)}?`,
        modalType: 'delete',
      };

    case registerUserTypes.FULFILLED:
      return { ...state, isLoading: false, managers: [...state.managers, payload.user] };

    case getManagersTypes.PENDING:
      return { ...state, isLoading: true, error: null };

    case getManagersTypes.FULFILLED:
      return { ...state, isLoading: false, error: null, managers: payload };
    case getManagersTypes.REJECTED:
      return { ...state, isLoading: false, error: payload };

    default:
      return { ...state };
  }
};
