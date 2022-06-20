import { useDispatch } from 'react-redux';
import AddForm from '../../components/AddForm';
import { addNoteAsyncActions } from '../../redux/actions/notes-async-actions';
import ManagersList from '../../components/ManagersList/ManagersList';
import { Box } from '@mui/material';

export default function ManagerPage() {
  const dispatch = useDispatch();

  return (
    <Box>
      <AddForm
        submitForm={data => {
          dispatch(
            addNoteAsyncActions({
              ...data,
            }),
          );
        }}
      />
      <ManagersList />
    </Box>
  );
}
