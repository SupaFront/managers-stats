import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getManagersAsyncActions } from '../../redux/actions/auth-async-actions';
import { chooseName } from '../../redux/actions/ops-actions';
import { getManagersList } from '../../redux/selectors/ops-selectors';

export default function NameSelectAdmin() {
  const dispatch = useDispatch();
  const managers = useSelector(getManagersList);

  useEffect(() => {
    dispatch(getManagersAsyncActions());
  }, [dispatch]);

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
            sx={{ width: '150px', height: '56px' }}
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
          </Select>
        </FormControl>
      </>
    </Box>
  );
}
