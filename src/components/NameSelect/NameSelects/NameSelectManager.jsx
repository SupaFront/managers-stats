import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { chooseName } from '../../../redux/actions/opsActions';

export default function NameSelect() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(chooseName({ name }));
        }}
      >
        <label htmlFor="">
          Выберите имя менеджера
          <select defaultValue="" onChange={e => setName(e.target.value)}>
            <option disabled value="">
              Выберите
            </option>
            <option value="Яна">Яна</option>
            <option value="Людмила">Людмила</option>
            <option value="Карина 1">Карина 1</option>
            <option value="Карина 2">Карина 2</option>
          </select>
        </label>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
