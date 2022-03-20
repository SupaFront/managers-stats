import { useDispatch, useSelector } from 'react-redux';
import { chooseName } from '../../../redux/actions/opsActions';
import { getManagerName } from '../../../redux/selectors/opsSelectors';

export default function NameSelect() {
  const dispatch = useDispatch();
  const managerName = useSelector(getManagerName);

  return (
    <div>
      <form>
        <label htmlFor="">
          Выберите имя менеджера
          <select
            defaultValue={managerName}
            onChange={e => {
              e.preventDefault();
              dispatch(chooseName({ name: e.target.value }));
            }}
          >
            <option value="">Все</option>
            <option value="Яна">Яна</option>
            <option value="Людмила">Людмила</option>
            <option value="Карина 1">Карина 1</option>
            <option value="Карина 2">Карина 2</option>
          </select>
        </label>
      </form>
    </div>
  );
}
