import {
  editNoteTypes,
  addNoteTypes,
  deleteNoteTypes,
  loadNotesTypes,
} from './action-types/notes-types';

import { UploadNote, removeNote, editNote, getNotesList } from '../../API/fetchNotes';

export const addNoteAsyncActions = req => async dispatch => {
  dispatch({ type: addNoteTypes.PENDING });
  try {
    const payload = await UploadNote(req);
    dispatch({ type: addNoteTypes.FULFILLED, payload });
  } catch (err) {
    dispatch({ type: addNoteTypes.REJECTED, payload: err });
  }
};
export const loadNotesAsyncActions = req => async dispatch => {
  dispatch({ type: loadNotesTypes.PENDING });
  try {
    const payload = await getNotesList(req && req);
    dispatch({ type: loadNotesTypes.FULFILLED, payload });
  } catch (err) {
    dispatch({ type: loadNotesTypes.REJECTED, payload: err });
  }
};

export const editNoteAsyncActions = req => async dispatch => {
  dispatch({ type: editNoteTypes.PENDING });
  try {
    const payload = await editNote(req);
    dispatch({ type: editNoteTypes.FULFILLED, payload });
  } catch (err) {
    dispatch({ type: editNoteTypes.REJECTED, payload: err });
  }
};

export const deleteNoteAsyncActions = req => async dispatch => {
  dispatch({ type: deleteNoteTypes.PENDING });
  try {
    const payload = await removeNote(req);
    dispatch({ type: deleteNoteTypes.FULFILLED, payload });
  } catch (err) {
    dispatch({ type: deleteNoteTypes.REJECTED, payload: err });
  }
};
