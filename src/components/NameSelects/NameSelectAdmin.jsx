import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { chooseName } from '../../redux/actions/opsActions';

export default function NameSelectAdmin() {
  const dispatch = useDispatch();

  return (
    <Box>
      <>
        <FormControl>
          <InputLabel id="select-label">Менеджер</InputLabel>
          <Select
            labelId="select-label"
            name="name"
            label="Менеджер"
            id="name"
            defaultValue="Все"
            sx={{ width: '150px', height: '30px' }}
            onChange={e => {
              e.preventDefault();
              dispatch(chooseName({ name: e.target.value === 'Все' ? '' : e.target.value }));
            }}
          >
            <MenuItem value="Все">Все</MenuItem>
            <MenuItem value="Яна">Яна</MenuItem>
            <MenuItem value="Людмила">Людмила</MenuItem>
            <MenuItem value="Карина 1">Карина 1</MenuItem>
            <MenuItem value="Карина 2">Карина 2</MenuItem>
          </Select>
        </FormControl>
      </>
    </Box>
  );
}
