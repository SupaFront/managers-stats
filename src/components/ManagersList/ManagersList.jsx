import { Box, Grid, List, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotesAsyncActions } from '../../redux/actions/notes-async-actions';
import { getNotes } from '../../redux/selectors/notes-selectors';
import { getManagerName } from '../../redux/selectors/ops-selectors';
import getCurrentDates from '../../utils/getCurrentDates';
import MonthPicker from '../MonthPicker';
import NameSelectAdmin from '../NameSelects/NameSelectAdmin';
import ManagersListItem from './ManagersListItem';

const range = {
  min: { year: 2022, month: 1 },
  max: { year: 2030, month: 1 },
};

export default function ManagersList() {
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);
  const managerName = useSelector(getManagerName);
  useEffect(() => {
    dispatch(loadNotesAsyncActions(getCurrentDates()));
  }, [dispatch]);

  const notesByName = managerName
    ? notes.length && notes.filter(note => note.owner.login === managerName)
    : notes;

  const countConversionPercentage = () => {
    const good = notesByName.filter(note => note.result === '+').length;
    const bad = notesByName.filter(note => note.result === '-').length;
    const percent = (good / (good + bad)) * 100;
    const result = percent ? Math.round(percent) : 0;
    return result;
  };
  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          height: '70px',
          padding: '0px 5px 0px 5px',
          margin: '10px 0 5px',
        }}
      >
        <Typography variant="h4">
          {managerName ? `Записи менеджера ${managerName}` : 'Все записи'}
        </Typography>
        <MonthPicker range={range} />
        <NameSelectAdmin />
      </Box>
      <Box
        sx={{
          padding: '0px 5px 0px 5px',
          color: '#fff',
          borderRadius: '7px',
          backgroundColor: '#5cc465',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" component={'span'} sx={{ fontSize: '17px' }}>
          Всего:{notesByName ? notesByName.length : 0}
        </Typography>
        {managerName && (
          <Typography variant="h6" component={'span'} sx={{ fontSize: '17px' }}>
            Конверсия {countConversionPercentage()}%
          </Typography>
        )}
      </Box>
      <List>
        <Grid container spacing={1}>
          {notesByName &&
            notesByName.map(note => (
              <Grid item xs={6} key={note._id}>
                <ManagersListItem note={note} />
              </Grid>
            ))}
        </Grid>
      </List>
    </Box>
  );
}
