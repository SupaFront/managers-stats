import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getManagers } from '../../API/fetchUsers';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { getManagersAsyncActions } from '../../redux/actions/authAsyncActions';
import { chooseName } from '../../redux/actions/opsActions';
import { getManagersList } from '../../redux/selectors/opsSelectors';

export default function NameSelectAdmin() {
  const dispatch = useDispatch();
  const managers = useSelector(getManagersList);

  useEffect(() => {
    dispatch(asyncActionCreator(getManagersAsyncActions, getManagers));
  }, []);

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
            {managers.length &&
              managers.map(manager => (
                <MenuItem key={manager._id} value={manager.login}>
                  {manager.login}
                </MenuItem>
              ))}
            {/* <MenuItem value="Яна">Яна</MenuItem>
            <MenuItem value="Людмила">Людмила</MenuItem>
            <MenuItem value="Карина 1">Карина 1</MenuItem>
            <MenuItem value="Карина 2">Карина 2</MenuItem> */}
          </Select>
        </FormControl>
      </>
    </Box>
  );
}
