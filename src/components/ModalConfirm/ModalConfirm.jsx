import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import Notiflix from 'notiflix';
import * as yup from 'yup';
import { getNoteForDelete, getNoteForEdit } from '../../redux/selectors/notesSelectors';
import { getModalType, getWarningText } from '../../redux/selectors/opsSelectors';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { editNote, removeNote } from '../../API/fetchInfo';
import { deleteNoteAsyncActions, editNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import { clearPreparedNotes, closeModal } from '../../redux/actions/opsActions';
import { convertDateToString } from '../../utils/convertDateToString';
import { Field, Formik } from 'formik';
import { useState } from 'react';

const modalRoot = document.getElementById('modal-root');

export default function ModalConfirm() {
  const dispatch = useDispatch();
  const warningText = useSelector(getWarningText);
  const modalType = useSelector(getModalType);
  const noteForEdit = useSelector(getNoteForEdit);
  const noteforDelete = useSelector(getNoteForDelete);
  const [question, setQuestion] = useState(false);
  const validationSchema = yup.object().shape({
    additional: yup.string().required('Обязательное поле!'),
    result: yup.string().required('Выберите ответ!'),
  });

  const checkEditedNote = values => {
    console.log(values);
    dispatch(
      asyncActionCreator(editNoteAsyncActions, editNote, {
        ...noteForEdit,
        ...values,
        editDate: convertDateToString(Date.now()),
      }),
    );
    dispatch(closeModal());
    dispatch(clearPreparedNotes());
    Notiflix.Notify.success('Изменения успешно сохранены!', 3000);
  };

  const getModalControls = () => {
    let modalControls = null;

    if (modalType === 'delete') {
      modalControls = (
        <div>
          <p>{warningText}</p>
          <button
            onClick={() => {
              dispatch(asyncActionCreator(deleteNoteAsyncActions, removeNote, noteforDelete));
              dispatch(closeModal());
            }}
          >
            Да
          </button>
          <button
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            Нет
          </button>
        </div>
      );
    } else if (modalType === 'edit') {
      modalControls = (
        <div>
          <Formik
            initialValues={{ additional: noteForEdit.additional, result: '' }}
            validateOnBlur
            validationSchema={validationSchema}
            onSubmit={() => setQuestion(true)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              dirty,
              isValid,
              resetForm,
            }) =>
              !question ? (
                <div>
                  <label htmlFor="result">Результат</label>
                  <select
                    name="result"
                    id="result"
                    defaultValue=""
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option disabled value="">
                      Выбрать
                    </option>
                    <option value="+">+</option>
                    <option value="-">-</option>
                  </select>
                  {touched.result && errors.result && <p className="errors">{errors.result}</p>}
                  <label htmlFor="additional">Результат</label>
                  <Field
                    name="additional"
                    as="textarea"
                    id="additional"
                    value={values.additional}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></Field>
                  {touched.additional && errors.additional && (
                    <p className="errors">{errors.additional}</p>
                  )}
                  <button
                    type="submit"
                    disabled={values.result ? !isValid && !dirty : true}
                    onClick={handleSubmit}
                  >
                    Изменить
                  </button>
                </div>
              ) : (
                <div>
                  <p>{warningText}</p>
                  <button
                    onClick={() => {
                      checkEditedNote();
                    }}
                  >
                    Да
                  </button>
                  <button
                    onClick={() => {
                      dispatch(closeModal());
                      dispatch(clearPreparedNotes());
                    }}
                  >
                    Нет
                  </button>
                </div>
              )
            }
          </Formik>
        </div>
      );
    }
    return modalControls;
  };

  return ReactDOM.createPortal(
    <div>
      <div>
        <button onClick={() => dispatch(closeModal())}>x</button>
        {modalType && getModalControls()}
      </div>
    </div>,
    modalRoot,
  );
}
