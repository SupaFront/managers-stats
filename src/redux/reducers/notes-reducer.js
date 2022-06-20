import {
  addNoteTypes,
  loadNotesTypes,
  editNoteTypes,
  deleteNoteTypes,
} from '../actions/action-types/notes-types';
import {
  closeModalType,
  prepareforDeleteType,
  prepareForEditType,
} from '../actions/action-types/ops-types';

const initialState = {
  notes: [],
  noteForEdit: null,
  noteForDelete: null,
  loading: false,
  error: null,
};

export const notesAsyncReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case addNoteTypes.PENDING:
      return { ...state, error: null, loading: true };
    case addNoteTypes.FULFILLED:
      return { ...state, notes: [...state.notes, { ...payload }] };
    case addNoteTypes.REJECTED:
      return { ...state, error: payload, loading: false };
    case loadNotesTypes.PENDING:
      return { ...state, error: null, loading: true };
    case loadNotesTypes.FULFILLED:
      return { ...state, notes: [...payload] };
    case loadNotesTypes.REJECTED:
      return { ...state, error: payload, loading: false };
    case deleteNoteTypes.PENDING:
      return { ...state, error: null, loading: true };
    case deleteNoteTypes.FULFILLED:
      return {
        ...state,
        noteForDelete: null,
        noteForEdit: null,
        notes: state.notes.length > 0 && state.notes.filter(note => note._id !== payload),
      };
    case deleteNoteTypes.REJECTED:
      return { ...state, error: payload, loading: false };
    case editNoteTypes.PENDING:
      return { ...state, error: null, loading: true };
    case editNoteTypes.FULFILLED:
      console.log(payload);
      return {
        ...state,
        notes:
          state.notes.length > 0 &&
          state.notes.map(note => (note._id === payload._id ? payload : note)),
      };
    case editNoteTypes.REJECTED:
      return { ...state, error: payload, loading: false };
    case prepareForEditType:
      return { ...state, noteForEdit: payload };
    case prepareforDeleteType:
      return { ...state, noteForDelete: payload };
    case closeModalType:
      return { ...state, noteForDelete: null, noteForEdit: null };

    default:
      return { ...state };
  }
};
