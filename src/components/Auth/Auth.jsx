import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Formik, useFormikContext } from 'formik';
import * as yup from 'yup';

import { logIn } from '../../redux/actions/opsActions';
import { Box, Button, FormControl, InputAdornment, TextField, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

const initialState = { login: '', password: '' };

const validationSchema = yup.object().shape({
  login: yup.string().required('Обязательное поле!'),
  password: yup
    .string()
    .length()
    .test('length', 'Минимум 8 символов!', val => val && val.length >= 8)
    .required('Обязательное поле!'),
});
export default function Auth() {
  const dispatch = useDispatch();

  const checkUser = ({ login, password }) => {
    if (login === 'admin' && password === 'organicbud228') {
      dispatch(logIn());
    } else {
      Notiflix.Notify.failure('Неверный логин или пароль!', 5000);
    }
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      sx={{ margin: '30px auto 0 auto', width: '300px' }}
    >
      <Formik
        initialValues={initialState}
        validateOnBlur
        validationSchema={validationSchema}
        onSubmit={values => checkUser(values)}
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
        }) => (
          <>
            <FormControl sx={{ mb: '15px', position: 'relative' }}>
              <TextField
                type={'text'}
                name={'login'}
                id={'login'}
                label={'Логин'}
                value={values.login}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              {touched.login && errors.login && (
                <Typography
                  sx={{ position: 'absolute', top: 50, left: 50, fontSize: '15px' }}
                  color="error"
                >
                  {errors.login}
                </Typography>
              )}
            </FormControl>
            <FormControl sx={{ position: 'relative' }}>
              <TextField
                type={'text'}
                name={'password'}
                id={'password'}
                label={'Пароль'}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {touched.password && errors.password && (
                <Typography
                  sx={{ position: 'absolute', top: 50, left: 50, fontSize: '15px' }}
                  color="error"
                >
                  {errors.password}
                </Typography>
              )}
            </FormControl>
            <Button
              // disabled={!isValid && !dirty}
              type={'submit'}
              onClick={() => {
                handleSubmit();
              }}
              sx={{ mt: '30px' }}
              variant="contained"
            >
              Войти
            </Button>
          </>
        )}
      </Formik>
    </Box>
  );
}
