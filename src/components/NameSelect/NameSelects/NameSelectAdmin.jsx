import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { chooseName } from '../../../redux/actions/opsActions';
import { getManagerName } from '../../../redux/selectors/opsSelectors';

export default function NameSelect() {
  const dispatch = useDispatch();

  return (
    <div>
      <form>
        <FormControl>
          <InputLabel id="select-label">Менеджер</InputLabel>
          <Select
            labelId="select-label"
            name="name"
            label="Менеджер"
            id="name"
            defaultValue=""
            sx={{ width: '150px', height: '40px' }}
            onChange={e => {
              e.preventDefault();
              dispatch(chooseName({ name: e.target.value }));
            }}
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="Яна">Яна</MenuItem>
            <MenuItem value="Людмила">Людмила</MenuItem>
            <MenuItem value="Карина 1">Карина 1</MenuItem>
            <MenuItem value="Карина 2">Карина 2</MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  );
}
