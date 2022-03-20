export const addNote = data => ({
  type: 'add',
  payload: data,
});

export const chooseName = data => ({
  type: 'chooseName',
  payload: data,
});
export const logIn = () => ({
  type: 'logIn',
  payload: true,
});

export const openModal = data => ({
  type: 'openModal',
});
export const closeModal = data => ({
  type: 'closeModal',
});

export const prepareForEdit = data => ({
  type: 'prepareForEdit',
  payload: data,
});

export const prepareForDelete = data => ({
  type: 'prepareForDelete',
  payload: data,
});

export const clearPreparedNotes = () => ({
  type: 'clearPreparedNotes',
});
