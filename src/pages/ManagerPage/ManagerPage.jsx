import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddForm from '../../components/AddForm';
import { UploadNote } from '../../API/fetchInfo';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { addNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import NameSelect from '../../components/NameSelect/NameSelect';
import { addNote, chooseName } from '../../redux/actions/opsActions';
import { getManagerName, getSelected } from '../../redux/selectors/opsSelectors';

import ManagersList from '../../components/ManagersList/ManagersList';

export default function ManagerPage() {
  const dispatch = useDispatch();

  const managerName = useSelector(getManagerName);
  const selected = useSelector(getSelected);

  useEffect(() => {
    !selected && dispatch(chooseName({ name: '' }));
  }, [dispatch]);

  return !managerName && selected ? (
    <NameSelect />
  ) : (
    <div>
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
      <ManagersList />
    </div>
  );
}
