import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { addNote } from '../../redux/actions';
import store from '../../redux/store';

export default function AddForm({ submitForm }) {
  const dispatch = useDispatch();
  const [result, setResult] = useState('');
  const [additional, setAdditional] = useState('');

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          submitForm({ result, additional });
          setResult('');
          setAdditional('');
        }}
      >
        <label htmlFor="result">
          {'Результат'}
          <select
            required
            value={result}
            name="result"
            id="result"
            onChange={e => setResult(e.target.value)}
          >
            <option value="" disabled>
              Выберите
            </option>
            <option value="plus">+</option>
            <option value="minus">-</option>
          </select>
        </label>
        <label>
          {'Клиент'}
          <textarea
            required
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
// const mapStateToProps = state => {
//   return {
//     result: state.result,
//     additional: state.additional,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     add: info => dispatch(addNote(info)),
//   };
// };
// connect(mapStateToProps, mapDispatchToProps)(AddForm);
