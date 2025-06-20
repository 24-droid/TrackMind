import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import PrivateRoutes from './components/PrivateRoutes';
import { AuthProvider } from './context/AuthContext'; 
import Home from './pages/Home';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/profile" element={<Profile />} />  
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;