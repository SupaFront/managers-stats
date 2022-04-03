import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import Notiflix from 'notiflix';
import * as yup from 'yup';
import { getNoteForDelete, getNoteForEdit } from '../../redux/selectors/notesSelectors';
import { getIsModalOpen, getModalType, getWarningText } from '../../redux/selectors/opsSelectors';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { editNote, removeNote } from '../../API/fetchInfo';
import { deleteNoteAsyncActions, editNoteAsyncActions } from '../../redux/actions/noteAsyncActions';
import { clearPreparedNotes, closeModal } from '../../redux/actions/opsActions';
import { convertDateToString } from '../../utils/convertDateToString';
import { Field, Formik } from 'formik';
import { useState } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import SaveIcon from '@mui/icons-material/Save';

const modalRoot = document.getElementById('modal-root');

export default function ModalConfirm() {
  const dispatch = useDispatch();
  const warningText = useSelector(getWarningText);
  const modalType = useSelector(getModalType);
  const noteForEdit = useSelector(getNoteForEdit);
  const noteforDelete = useSelector(getNoteForDelete);
  const isModalOpen = useSelector(getIsModalOpen);
  const [question, setQuestion] = useState(false);
  const [values, setValues] = useState(null);
  const validationSchema = yup.object().shape({
    additional: yup.string().required('Обязательное поле!'),
    result: yup.string().required('Выберите ответ!'),
  });

  const checkEditedNote = () => {
    dispatch(
      asyncActionCreator(editNoteAsyncActions, editNote, {
        ...noteForEdit,
        ...values,
        editDate: convertDateToString(Date.now()),
      }),
    );
    dispatch(closeModal());
    dispatch(clearPreparedNotes());
    Notiflix.Notify.info('Изменения сохранены!', 3000);
  };

  const getModalControls = () => {
    let modalControls = null;

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #5cc465',
      borderRadius: '6px',
      boxShadow: 24,
      padding: '10px',
    };

    if (modalType === 'delete') {
      modalControls = (
        <Modal
          open={isModalOpen}
          onClose={() => dispatch(closeModal())}
          aria-labelledby="modal"
          aria-describedby="modal"
        >
          <Box sx={style}>
            <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
              {warningText}
            </Typography>
            <Box sx={{ mt: '15px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  dispatch(asyncActionCreator(deleteNoteAsyncActions, removeNote, noteforDelete));
                  dispatch(closeModal());
                }}
              >
                Да
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ ml: '10px' }}
                onClick={() => {
                  dispatch(closeModal());
                }}
              >
                Нет
              </Button>
            </Box>
          </Box>
        </Modal>
      );
    } else if (modalType === 'edit') {
      modalControls = (
        <Modal open={isModalOpen} onClose={() => dispatch(closeModal())}>
          <Box sx={style}>
            <Formik
              initialValues={{ additional: noteForEdit.additional, result: '' }}
              validateOnBlur
              validationSchema={validationSchema}
              onSubmit={values => {
                setValues(values);
                setQuestion(true);
              }}
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
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <FormControl sx={{ position: 'relative' }}>
                      <TextField
                        label="Дополнительная информация"
                        variant="outlined"
                        name="additional"
                        id="additional"
                        multiline
                        value={values.additional}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></TextField>
                      {touched.additional && errors.additional && (
                        <Typography
                          sx={{
                            position: 'absolute',
                            left: 15,
                            top: 57,
                            fontSize: '11px',
                          }}
                          color="error"
                        >
                          {errors.additional}
                        </Typography>
                      )}
                    </FormControl>
                    <Box
                      marginTop={'15px'}
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'flex-end'}
                    >
                      <FormControl sx={{ position: 'relative' }}>
                        <FormLabel id="result">Результат</FormLabel>
                        <RadioGroup
                          aria-labelledby="result"
                          defaultValue=""
                          name="result"
                          row
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <FormControlLabel value="+" control={<Radio />} label="+" />
                          <FormControlLabel value="-" control={<Radio />} label="-" />
                        </RadioGroup>
                        {touched.result && errors.result && (
                          <Typography
                            sx={{
                              position: 'absolute',
                              left: 0,
                              top: 18,
                              fontSize: '11px',
                            }}
                            color="error"
                          >
                            {errors.result}
                          </Typography>
                        )}
                      </FormControl>
                      <Button
                        sx={{ height: '40px' }}
                        variant="contained"
                        endIcon={<SaveIcon />}
                        type="submit"
                        disabled={!isValid && !dirty}
                        onClick={handleSubmit}
                      >
                        Изменить
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={style}>
                    <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                      {warningText}
                    </Typography>
                    <Box sx={{ mt: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          checkEditedNote();
                        }}
                      >
                        Да
                      </Button>
                      <Button
                        sx={{ ml: '10px' }}
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          dispatch(closeModal());
                          dispatch(clearPreparedNotes());
                        }}
                      >
                        Нет
                      </Button>
                    </Box>
                  </Box>
                )
              }
            </Formik>
          </Box>
        </Modal>
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
