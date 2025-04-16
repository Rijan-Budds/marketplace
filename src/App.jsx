import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import Home from './Home';
import Marketplace from './Marketplace';

// PrivateRoute component (can stay in this file for now)
const PrivateRoute = ({ children }) => {
  const isAuth = !!localStorage.getItem('token'); 
  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/marketplace' element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />

        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
