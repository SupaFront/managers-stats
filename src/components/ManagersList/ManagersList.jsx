import { Box, Grid, List, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesList } from '../../API/fetchNotes';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { loadNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import { getNotes } from '../../redux/selectors/notesSelectors';
import { getManagerName } from '../../redux/selectors/opsSelectors';
import NameSelectAdmin from '../NameSelects/NameSelectAdmin';
import ManagersListItem from './ManagersListItem';

export default function ManagersList() {
  const dispatch = useDispatch();
  const notes = useSelector(getNotes);
  const managerName = useSelector(getManagerName);

  const notesByName = managerName
    ? notes.length && notes.filter(note => note.name === managerName)
    : notes;

  useEffect(() => {
    dispatch(asyncActionCreator(loadNoteAsyncActions, getNotesList));
  }, [dispatch]);

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
          height: '40px',
          padding: '0px 5px 0px 5px',
        }}
      >
        <Typography variant="h6">
          {managerName ? `Записи менеджера ${managerName}` : 'Все записи'}
        </Typography>
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
