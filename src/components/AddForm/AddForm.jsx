import SaveIcon from '@mui/icons-material/Save';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPreparedNotes } from '../../redux/actions/opsActions';
import { getNoteForEdit } from '../../redux/selectors/notesSelectors';
import { getAuthorized, getManagerName } from '../../redux/selectors/opsSelectors';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';

export default function AddForm({ submitForm }) {
  // const dispatch = useDispatch();
  // const managerName = useSelector(getManagerName);

  // const noteForEdit = useSelector(getNoteForEdit);
  const authorized = useSelector(getAuthorized);

  const validationSchema = yup.object().shape({
    additional: yup.string().required('Обязательное поле!'),
    result: yup.string().required('Выберите ответ!'),
    name: yup.string().required('Выберите Менеджера!'),
  });
  // useEffect(() => {
  //   if (noteForEdit) {
  //     dispatch(clearPreparedNotes());
  //   }
  // }, [managerName]);

  return (
    <div>
      <Formik
        initialValues={{ additional: '', result: '', name: '' }}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, dirty, isValid }) => (
          <div>
            {/* <FormControl>
              <InputLabel id="result">Результат</InputLabel>
              <Select
                labelId="result"
                name="result"
                id="result"
                label="Результат"
                value={values.result}
                sx={{ width: '70px', height: '40px' }}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="">Выбрать</MenuItem>
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
              </Select>
            </FormControl> */}
            <FormControl>
              <FormLabel id="result">Результат</FormLabel>
              <RadioGroup
                aria-labelledby="result"
                defaultValue=""
                name="result"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <FormControlLabel value="+" control={<Radio />} label="+" />
                <FormControlLabel value="-" control={<Radio />} label="-" />
              </RadioGroup>
            </FormControl>
            {touched.result && errors.result && <p className="errors">{errors.result}</p>}
            {/* <label htmlFor="additional">Результат</label> */}
            <TextField
              label="Дополнительная информация"
              variant="outlined"
              name="additional"
              id="additional"
              value={values.additional}
              onChange={handleChange}
              onBlur={handleBlur}
            ></TextField>
            {touched.additional && errors.additional && (
              <p className="errors">{errors.additional}</p>
            )}
            {authorized && (
              <>
                <FormControl>
                  <InputLabel id="select-label">Имя</InputLabel>

                  <Select
                    labelId="select-label"
                    name="name"
                    value={values.name}
                    id="name"
                    label="Имя"
                    sx={{ width: '150px', height: '40px' }}
                    onChange={handleChange}
                  >
                    {/* <MenuItem value="">Все</MenuItem> */}
                    <MenuItem value="Яна">Яна</MenuItem>
                    <MenuItem value="Людмила">Людмила</MenuItem>
                    <MenuItem value="Карина 1">Карина 1</MenuItem>
                    <MenuItem value="Карина 2">Карина 2</MenuItem>
                  </Select>
                </FormControl>
                {touched.name && errors.name && <p className="errors">{errors.name}</p>}
              </>
            )}

            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              type="submit"
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
            >
              Добавить
            </Button>
          </div>
        )}
      </Formik>
    </div>
  );
}
