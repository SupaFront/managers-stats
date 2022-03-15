import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddForm from '../../components/AddForm';
import { UploadNote } from '../../API/fetchInfo';
import { asyncActionCreator } from '../../redux/asyncActionCreator';
import { addNoteAsyncActions } from '../../redux/asyncActions';
import NameSelect from '../../components/NameSelect/NameSelect';
export default function ManagerPage() {
  const dispatch = useDispatch();
  const additional = useSelector(state => state.additional);
  const result = useSelector(state => state.result);
  const managerName = useSelector(state => state.name);
  useEffect(() => {}, []);

  // const submitForm = () => {
  //   dispatch
  // };

  return !managerName ? (
    <NameSelect />
  ) : (
    <AddForm
      submitForm={data => {
        dispatch(
          asyncActionCreator(addNoteAsyncActions, UploadNote, {
            name: managerName,
            ...data,
          }),
        );
      }}
    />
  );
}
