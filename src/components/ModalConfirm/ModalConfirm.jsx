import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Notiflix from 'notiflix';
import { getNoteForDelete, getNoteForEdit } from '../../redux/selectors/notesSelectors';
import { getModalType, getWarningText } from '../../redux/selectors/opsSelectors';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { editNote, removeNote } from '../../API/fetchInfo';
import { deleteNoteAsyncActions, editNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import { clearPreparedNotes, closeModal } from '../../redux/actions/opsActions';
import { convertDateToString } from '../../utils/convertDateToString';

const modalRoot = document.getElementById('modal-root');

export default function ModalConfirm() {
  const dispatch = useDispatch();
  const warningText = useSelector(getWarningText);
  const modalType = useSelector(getModalType);
  const noteForEdit = useSelector(getNoteForEdit);
  const noteforDelete = useSelector(getNoteForDelete);

  const [add, setAdd] = useState(noteForEdit.additional);
  const [res, setRes] = useState('');
  const [question, setQuestion] = useState(false);

  const checkEditedNote = () => {
    dispatch(
      asyncActionCreator(editNoteAsyncActions, editNote, {
        ...noteForEdit,
        additional: add,
        result: res,
        editDate: convertDateToString(Date.now()),
      }),
    );
    dispatch(closeModal());
    dispatch(clearPreparedNotes());
    setAdd('');
    setRes('');
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
          {!question ? (
            <div>
              <p>
                Запись менеджера {noteForEdit.name} за {noteForEdit.date}{' '}
              </p>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (!res) {
                    Notiflix.Notify.failure('Заполните поле "Результат"!', 3000);
                  } else if (!add) {
                    Notiflix.Notify.failure('Заполните поле "Клиент"!', 3000);
                  } else {
                    setQuestion(true);
                  }
                }}
              >
                <label>
                  Результат
                  <select
                    defaultValue=""
                    onChange={e => {
                      setRes(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Выбрать
                    </option>
                    <option value="+">+</option>
                    <option value="-">-</option>
                  </select>
                </label>
                <label>
                  Клиент
                  <textarea
                    onChange={e => {
                      setAdd(e.target.value);
                    }}
                    value={add}
                    name="additional"
                    id="additional"
                  ></textarea>
                </label>
                <button type="submit">Изменить</button>
              </form>
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
          )}
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
