const initialState = {
  notes: [],
  noteForEdit: null,
  noteForDelete: null,
};

export const notesAsyncReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'notes/add_SUCCESS':
      return { ...state, notes: [...state.notes, { ...payload }] };

    case 'notes/load_SUCCESS':
      return { ...state, notes: [...payload] };

    case 'prepareForEdit':
      return { ...state, noteForEdit: payload };
    case 'prepareForDelete':
      return { ...state, noteForDelete: payload };
    case 'clearPreparedNotes':
      return { ...state, noteForDelete: null, noteForEdit: null };

    case 'notes/delete_SUCCESS':
      return {
        ...state,
        noteForDelete: null,
        noteForEdit: null,
        notes: state.notes.length > 0 && state.notes.filter(note => note.id !== payload),
      };

    case 'notes/edit_SUCCESS':
      return {
        ...state,
        notes:
          state.notes.length > 0 &&
          state.notes.map(note => (note.id === payload.id ? payload : note)),
      };
    default:
      return { ...state };
  }
};
