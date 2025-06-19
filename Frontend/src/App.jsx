// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // Your main CSS file
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // You'll create this next
import PrivateRoutes from './components/PrivateRoutes';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Routes>
           <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />} />   
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;