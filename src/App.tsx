import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';
import Dashboard from './pages/Dashboard'; 
import Resumen from './pages/Resumen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/resumen" element={<Resumen />} />

      </Routes>
    </Router>
  );
}

export default App;
