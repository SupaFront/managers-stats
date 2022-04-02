import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddForm from '../../components/AddForm';
import { UploadNote } from '../../API/fetchInfo';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { addNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import NameSelect from '../../components/NameSelect/NameSelect';
import { addNote, chooseName } from '../../redux/actions/opsActions';
import { getManagerName, getSelected } from '../../redux/selectors/opsSelectors';
import s from './ManagerPage.module.css';

import ManagersList from '../../components/ManagersList/ManagersList';

export default function ManagerPage() {
  const dispatch = useDispatch();

  const managerName = useSelector(getManagerName);
  const selected = useSelector(getSelected);

  useEffect(() => {
    !selected && dispatch(chooseName({ name: '' }));
  }, [dispatch]);

  return !managerName && selected ? (
    <div className={s.select_container}>
      <NameSelect />
    </div>
  ) : (
    <div className={s.container}>
      <AddForm
        submitForm={data => {
          dispatch(addNote(data));
          dispatch(
            asyncActionCreator(addNoteAsyncActions, UploadNote, {
              ...data,
              name: managerName,
            }),
          );
        }}
      />
      <ManagersList />
    </div>
  );
}
