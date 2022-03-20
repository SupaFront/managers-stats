import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/actions/opsActions';

export default function Auth() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const checkUser = () => {
    if (login === 'admin' && password === 'organicbud228') {
      dispatch(logIn());
    } else {
      Notiflix.Notify.failure('Неверный логин или пароль!', 5000);
      setLogin('');
      setPassword('');
    }
  };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          checkUser();
        }}
      >
        <label>
          Логин
          <input type="text" name="login" value={login} onChange={e => setLogin(e.target.value)} />
        </label>
        <label>
          Пароль
          <input
            type="text"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
