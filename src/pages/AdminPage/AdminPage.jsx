import { useDispatch } from 'react-redux';
import AddForm from '../../components/AddForm';
import ManagersList from '../../components/ManagersList/ManagersList';
import { addNoteAsyncActions } from '../../redux/actions/notes-async-actions';
import { Box } from '@mui/system';
import RegisterForm from '../../components/RegisterForm/';

export default function AdminPage() {
  const dispatch = useDispatch();

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        // flexBasis={'calc((100% - 40px) / 2);'} flex={'no-wrap'}
      >
        <AddForm
          submitForm={data => {
            dispatch(addNoteAsyncActions(data));
          }}
        />
        <RegisterForm />
        <Box width={'100%'}>
          <ManagersList />
        </Box>
      </Box>
    </>
  );
}
