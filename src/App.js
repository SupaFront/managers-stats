import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './API/fetchUsers';
import './App.css';
import Header from './components/Header/Header';
import ModalConfirm from './components/ModalConfirm';
import AdminPage from './pages/AdminPage';
import ManagerPage from './pages/ManagerPage/ManagerPage';
import { asyncActionCreator } from './redux/actions/asyncActionCreator';
import { getCurrentUserAsyncActions } from './redux/actions/authAsyncActions';
import { getToken } from './redux/selectors/authSelectors';
import { getIsModalOpen } from './redux/selectors/opsSelectors';
import { setToken } from './utils/tokenActs';

function App() {
  const modalOpen = useSelector(getIsModalOpen);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  useEffect(() => {
    token && setToken(token);
    dispatch(asyncActionCreator(getCurrentUserAsyncActions, getCurrentUser));
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      <Container sx={{ mt: '10px' }}>
        {/* <ManagerPage /> */}
        <AdminPage />
        {modalOpen && <ModalConfirm />}
      </Container>
    </div>
  );
}

export default App;
