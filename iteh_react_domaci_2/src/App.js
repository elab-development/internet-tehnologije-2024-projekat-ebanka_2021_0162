import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LogInPageUser from './components/LogInPageUser';
import RegisterPageUser from './components/RegisterPageUser';
import LogInPageAdmin from './components/LogInPageAdmin';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogInPageUser/>}/>
          <Route path="/register" element={<RegisterPageUser/>} />
          <Route path="/home" element={<><h1>Dobrodosli!</h1></>} />
          <Route path="/admin/login" element={<LogInPageAdmin/>} />
          <Route path="*" element={<div>404 Not Found</div>} /> {/* Fallback ruta */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
