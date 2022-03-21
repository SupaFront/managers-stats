import { useDispatch, useSelector } from 'react-redux';
import { openModal, prepareForDelete, prepareForEdit } from '../../../redux/actions/opsActions';
import { getAuthorized } from '../../../redux/selectors/opsSelectors';
export default function ManagersListItem({ note }) {
  const dispatch = useDispatch();
  const authorized = useSelector(getAuthorized);

  return (
    <li key={note.id}>
      <p>{note && note.name}</p>
      <span>Результат: {note && note.result}</span>
      <p>{note && note.additional}</p>
      <span>{note.date && note.date}</span>
      {authorized && (
        <>
          <button
            onClick={() => {
              dispatch(prepareForEdit({ ...note }));
              dispatch(openModal());
            }}
          >
            Редактировать
          </button>
          <button
            onClick={() => {
              dispatch(prepareForDelete({ ...note }));
              dispatch(openModal());
            }}
          >
            Удалить
          </button>
        </>
      )}
    </li>
  );
}
