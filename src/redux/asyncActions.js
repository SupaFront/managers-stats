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
