import { useSelector } from 'react-redux';
import './App.css';
import AddForm from './components/AddForm';
import ModalConfirm from './components/ModalConfirm';
import AdminPage from './pages/AdminPage';
import ManagerPage from './pages/ManagerPage/ManagerPage';
import { getAuthorized, getIsModalOpen } from './redux/selectors/opsSelectors';

function App() {
  const modalOpen = useSelector(getIsModalOpen);

  return (
    <div className="App">
      {/* <ManagerPage /> */}
      <AdminPage />
      {modalOpen && <ModalConfirm />}
    </div>
  );
}

export default App;
