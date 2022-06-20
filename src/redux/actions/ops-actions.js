import {
  chooseNameType,
  logInType,
  openModalType,
  closeModalType,
  prepareForEditType,
  prepareforDeleteType,
  setDateType,
} from './action-types/ops-types';

export const chooseName = data => ({
  type: chooseNameType,
  payload: data,
});
export const logIn = () => ({
  type: logInType,
});

export const openModal = () => ({
  type: openModalType,
});
export const closeModal = () => ({
  type: closeModalType,
});

export const prepareForEdit = data => ({
  type: prepareForEditType,
  payload: data,
});

export const prepareForDelete = data => ({
  type: prepareforDeleteType,
  payload: data,
});

export const setDate = data => ({
  type: setDateType,
  payload: data,
});
