import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import { Box, Button, FormControl, InputAdornment, TextField, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { asyncActionCreator } from '../../redux/actions/asyncActionCreator';
import { registerUser } from '../../API/fetchUsers';
import { registerUserAsyncActions } from '../../redux/actions/authAsyncActions';

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const initialState = { login: '', password: '' };

const validationSchema = yup.object().shape({
  login: yup.string().required('Обязательное поле!'),
  password: yup
    .string()
    .length()
    .test('length', 'Минимум 8 символов!', val => val && val.length >= 8)
    .required('Обязательное поле!'),
  email: yup.string().matches(emailRegexp, 'Неверный формат!').required('Обязательное поле!'),
});
export default function RegisterForm() {
  const dispatch = useDispatch();

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
        onSubmit={values =>
          dispatch(asyncActionCreator(registerUserAsyncActions, registerUser, values))
        }
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
            {' '}
            <FormControl sx={{ mb: '15px', position: 'relative' }}>
              <TextField
                type={'text'}
                name={'email'}
                id={'email'}
                label={'Почта'}
                value={values.email}
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
              {touched.email && errors.email && (
                <Typography
                  sx={{ position: 'absolute', top: 50, left: 50, fontSize: '15px' }}
                  color="error"
                >
                  {errors.login}
                </Typography>
              )}
            </FormControl>
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
              type={'submit'}
              onClick={() => {
                handleSubmit();
              }}
              sx={{ mt: '30px' }}
              variant="contained"
            >
              Зарегистрировать
            </Button>
          </>
        )}
      </Formik>
    </Box>
  );
}
