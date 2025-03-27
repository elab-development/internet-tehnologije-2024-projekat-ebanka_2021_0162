import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LogInPageUser from './components/LogInPageUser';
import RegisterPageUser from './components/RegisterPageUser';
import LogInPageAdmin from './components/LogInPageAdmin';
import UnauthorisedAccessPage from './components/UnauthorisedAccessPage';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import UserLogout from './components/UserLogout';
import AdminLogout from './components/AdminLogout';
import NavBar from './components/NavBar';
import KursnaLista from './components/KursnaLista';
import Racuni from './components/Racuni';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar login={1}/>}>
            <Route path="user/home" element={<UserHome /> } />
            <Route path="unauthorised_access" element={ <UnauthorisedAccessPage /> } />
          </Route>
          <Route path="/" element={<NavBar login={0}/>} >
            <Route path="user/login" element={<LogInPageUser/>}/>
            <Route path="user/register" element={<RegisterPageUser/>} />
            <Route path="user/logout" element={<UserLogout/> } />
            <Route path="kursna-lista" element={<KursnaLista/>}/>
            <Route path="admin/home" element={<AdminHome /> } />
            <Route path="admin/login" element={<LogInPageAdmin/>} />
            <Route path="admin/logout" element={<AdminLogout />} />
            <Route path="unauthorised_access" element={ <UnauthorisedAccessPage /> } />
          </Route>

          <Route path="*" element={<div>404 Not Found</div>} /> {/* Fallback ruta */}
          
        </Routes>
      </BrowserRouter>
  );
}

export default App;
