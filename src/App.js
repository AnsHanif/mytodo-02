import Routes from './pages/Routes';
import './App.css'
import AuthContextProvider from './pages/context/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <AuthContextProvider>
     <Routes />
     <ToastContainer />
    </AuthContextProvider>
    </>
  );
}

export default App;
