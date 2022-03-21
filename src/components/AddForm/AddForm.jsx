import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPreparedNotes } from '../../redux/actions/opsActions';
import { getNoteForEdit } from '../../redux/selectors/notesSelectors';
import { getManagerName } from '../../redux/selectors/opsSelectors';

import { convertDateToString } from '../../utils/convertDateToString';

export default function AddForm({ submitForm }) {
  const dispatch = useDispatch();
  const managerName = useSelector(getManagerName);
  const [result, setResult] = useState('');
  const [additional, setAdditional] = useState('');
  const noteForEdit = useSelector(getNoteForEdit);

  useEffect(() => {
    if (noteForEdit && result && additional) {
      dispatch(clearPreparedNotes());
      setResult('');
      setAdditional('');
    }
  }, [managerName]);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!result) {
            Notiflix.Notify.failure(`Заполните поле 'Результат'!`, 3000);
          } else if (!additional) {
            Notiflix.Notify.failure(`Заполните поле 'Клиент'!`, 3000);
          } else if (!managerName) {
            Notiflix.Notify.failure(`Заполните поле 'Менеджер'!`, 3000);
          } else {
            submitForm({ result, additional, date: convertDateToString(Date.now()) });
            setAdditional('');
          }
        }}
      >
        <label htmlFor="result">
          {'Результат'}
          <select
            defaultValue=""
            name="result"
            id="result"
            onChange={e => setResult(e.target.value)}
          >
            <option disabled value="">
              Выберите
            </option>
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </label>
        <label>
          {'Клиент'}
          <textarea
            value={additional}
            placeholder="Информация о клиенте"
            onChange={e => setAdditional(e.target.value)}
          ></textarea>
        </label>
        <button type="submit">Добавить запись</button>
      </form>
    </div>
  );
}
