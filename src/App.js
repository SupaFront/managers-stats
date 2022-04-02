import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import ModalConfirm from './components/ModalConfirm';
import AdminPage from './pages/AdminPage';
import ManagerPage from './pages/ManagerPage/ManagerPage';
import { getAuthorized, getIsModalOpen } from './redux/selectors/opsSelectors';

function App() {
  const modalOpen = useSelector(getIsModalOpen);

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
