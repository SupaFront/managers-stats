import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

import { loginUserAsyncActions } from '../../redux/actions/auth-async-actions';
import { Box, Button, FormControl, InputAdornment, TextField, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const initialState = { email: '', password: '' };

const validationSchema = yup.object().shape({
  email: yup.string().matches(emailRegexp, 'Неверный формат!').required('Обязательное поле!'),
  password: yup
    .string()
    .length()
    .test('length', 'Минимум 8 символов!', val => val && val.length >= 8)
    .required('Обязательное поле!'),
});
export default function Auth() {
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
        onSubmit={values => dispatch(loginUserAsyncActions(values))}
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
                  {errors.email}
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
              Войти
            </Button>
          </>
        )}
      </Formik>
    </Box>
  );
}
