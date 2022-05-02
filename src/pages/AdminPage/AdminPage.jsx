import { useDispatch, useSelector } from 'react-redux';
import { UploadNote } from '../../API/fetchNotes';
import AddForm from '../../components/AddForm';
import ManagersList from '../../components/ManagersList/ManagersList';
import Auth from '../../components/Auth';

import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { addNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import { getAuthorized } from '../../redux/selectors/opsSelectors';
import { convertDateToString } from '../../utils/convertDateToString';
import { Box } from '@mui/system';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

export default function AdminPage() {
  const dispatch = useDispatch();
  const authorized = useSelector(getAuthorized);

  return (
    <>
      {!authorized ? (
        <Auth />
      ) : (
        <>
          <Box
            display={'flex'}
            flexDirection={'column'}
            // flexBasis={'calc((100% - 40px) / 2);'} flex={'no-wrap'}
          >
            <AddForm
              submitForm={data => {
                dispatch(asyncActionCreator(addNoteAsyncActions, UploadNote, data));
              }}
            />
            <RegisterForm />
            <Box width={'100%'}>
              <ManagersList />
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
