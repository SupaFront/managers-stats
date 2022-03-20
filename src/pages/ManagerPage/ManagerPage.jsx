import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddForm from '../../components/AddForm';
import { UploadNote, editNote } from '../../API/fetchInfo';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { addNoteAsyncActions, editNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import NameSelect from '../../components/NameSelect/NameSelect';
import { addNote, chooseName } from '../../redux/actions/opsActions';
import {
  getManagerName,
  getSelected,
  getAdditional,
  getResult,
} from '../../redux/selectors/opsSelectors';
import { getNoteForEdit } from '../../redux/selectors/notesSelectors';
import ManagersList from '../../components/ManagersList/ManagersList';
import { convertDateToString } from '../../utils/convertDateToString';

export default function ManagerPage() {
  const dispatch = useDispatch();
  const additional = useSelector(getAdditional);
  const result = useSelector(getResult);
  const managerName = useSelector(getManagerName);
  const selected = useSelector(getSelected);
  const noteForEdit = useSelector(getNoteForEdit);

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
