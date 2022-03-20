import { useDispatch, useSelector } from 'react-redux';
import { UploadNote } from '../../API/fetchInfo';
import AddForm from '../../components/AddForm';
import ManagersList from '../../components/ManagersList/ManagersList';
import Auth from '../../components/Auth';
import { addNote, closeModal } from '../../redux/actions/opsActions';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { addNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import { getAuthorized, getManagerName } from '../../redux/selectors/opsSelectors';
import NameSelect from '../../components/NameSelect/NameSelect';

export default function AdminPage() {
  const dispatch = useDispatch();
  const authorized = useSelector(getAuthorized);
  const managerName = useSelector(getManagerName);

  return (
    <div>
      {!authorized ? (
        <Auth />
      ) : (
        <>
          <AddForm
            submitForm={data => {
              dispatch(addNote(data));
              dispatch(
                asyncActionCreator(addNoteAsyncActions, UploadNote, {
                  name: managerName,
                  ...data,
                }),
              );
            }}
          />
          <NameSelect />
          <ManagersList />
        </>
      )}
    </div>
  );
}