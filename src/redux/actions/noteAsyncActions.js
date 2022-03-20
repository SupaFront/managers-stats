export const addNoteAsyncActions = {
  pending: () => ({
    type: 'notes/add_START',
  }),
  fulfilled: data => ({
    type: 'notes/add_SUCCESS',
    payload: data,
  }),
  rejected: error => ({
    type: 'notes/add_FAILURE',
    payload: error,
  }),
};

export const loadNoteAsyncActions = {
  pending: () => ({
    type: 'notes/load_START',
  }),
  fulfilled: data => ({
    type: 'notes/load_SUCCESS',
    payload: data,
  }),
  rejected: error => ({
    type: 'notes/load_FAILURE',
    payload: error,
  }),
};

export const editNoteAsyncActions = {
  pending: () => ({
    type: 'notes/edit_START',
  }),
  fulfilled: data => ({
    type: 'notes/edit_SUCCESS',
    payload: data,
  }),
  rejected: error => ({
    type: 'notes/edit_FAILURE',
    payload: error,
  }),
};

export const deleteNoteAsyncActions = {
  pending: () => ({
    type: 'notes/delete_START',
  }),
  fulfilled: data => ({
    type: 'notes/delete_SUCCESS',
    payload: data,
  }),
  rejected: error => ({
    type: 'notes/delete_FAILURE',
    payload: error,
  }),
};
