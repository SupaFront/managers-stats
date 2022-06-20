import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import Header from './components/Header/Header';
import ModalConfirm from './components/ModalConfirm';
import AdminPage from './pages/AdminPage';
import ManagerPage from './pages/ManagerPage/ManagerPage';
import { getCurrentUserAsyncActions } from './redux/actions/auth-async-actions';
import { getUserRole } from './redux/selectors/auth-selectors';
import { getAuthorized, getIsModalOpen } from './redux/selectors/ops-selectors';

function App() {
  const modalOpen = useSelector(getIsModalOpen);
  const dispatch = useDispatch();
  const authorized = useSelector(getAuthorized);
  const role = useSelector(getUserRole);

  useEffect(() => {
    dispatch(getCurrentUserAsyncActions());
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      <Container sx={{ mt: '10px' }}>
        {!authorized ? <Auth /> : <>{role === 'admin' ? <AdminPage /> : <ManagerPage />}</>}
        {modalOpen && <ModalConfirm />}
      </Container>
    </div>
  );
}

export default App;
