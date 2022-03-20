import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesList } from '../../API/fetchInfo';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { loadNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import { getNotes } from '../../redux/selectors/notesSelectors';
import { getAuthorized, getManagerName } from '../../redux/selectors/opsSelectors';
import ManagersListItem from './ManagersListItem';

export default function ManagersList() {
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);
  const managerName = useSelector(getManagerName);

  const notesByName = managerName
    ? notes.length > 0 && notes.filter(note => note.name === managerName)
    : notes;

  useEffect(() => {
    dispatch(asyncActionCreator(loadNoteAsyncActions, getNotesList));
  }, [dispatch]);
  return (
    <div>
      <p>Записи менеджера {managerName}</p>
      <span>Всего:{notesByName ? notesByName.length : 0}</span>
      <ul>
        {notesByName && notesByName.map(note => <ManagersListItem key={note.id} note={note} />)}
      </ul>
    </div>
  );
}
