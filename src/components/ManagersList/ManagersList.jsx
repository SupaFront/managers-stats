import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesList } from '../../API/fetchInfo';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { loadNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import { getNotes } from '../../redux/selectors/notesSelectors';
import { getManagerName } from '../../redux/selectors/opsSelectors';
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

  const countConversionPercentage = () => {
    const good = notesByName.filter(note => note.result === '+').length;
    const bad = notesByName.filter(note => note.result === '-').length;
    const percent = (good / (good + bad)) * 100;
    const result = percent ? Math.round(percent) : 0;
    return result;
  };
  return (
    <div>
      <p>Записи менеджера {managerName}</p>
      <span>Всего:{notesByName ? notesByName.length : 0}</span>
      {managerName && <span>Конверсия {countConversionPercentage()}%</span>}
      <ul>
        {notesByName && notesByName.map(note => <ManagersListItem key={note.id} note={note} />)}
      </ul>
    </div>
  );
}
