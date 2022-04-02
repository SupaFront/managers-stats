import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Formik, useFormikContext } from 'formik';
import * as yup from 'yup';

import { logIn } from '../../redux/actions/opsActions';

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
    <div>
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
          <div className="form">
            <label htmlFor="login">Логин</label>

            <input
              type={'text'}
              name={'login'}
              id={'login'}
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.login && errors.login && <p className="errors">{errors.login}</p>}
            <br />
            <label htmlFor="password">Пароль</label>

            <input
              type={'text'}
              name={'password'}
              id={'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && <p className="errors">{errors.password}</p>}

            <br />
            <button
              disabled={!isValid && !dirty}
              type={'submit'}
              onClick={() => {
                handleSubmit();
              }}
            >
              Войти
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
}
