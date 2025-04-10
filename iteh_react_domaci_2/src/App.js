import { BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom';
import {useState, useEffect} from "react";
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
import AccountInfo from './components/AccountInfo';
import ProfileImageUpload from './components/ProfileImageUpload';
import NewTransaction from './components/NewTransaction';

function App() {

  const [logInStatusUser, setLogInStatusUser]=useState(false);
  const [focusedAcc, setFocusedAcc] = useState(null);


  useEffect( () => {
    if(window.sessionStorage.getItem("user_auth_token") != null)
      setLogInStatusUser(true);
  },[]);

  const handleLogInStatus = (status) => {
    setLogInStatusUser(status);
  }

  const handleAccountFocus = (acc) => {
    setFocusedAcc(acc);
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/user/login"/>} />

          <Route path="/" element={<NavBar login={1}/>}>
            <Route path="user/home" element={<UserHome accountFocus={handleAccountFocus} focusedAcc={focusedAcc}/> }/> } />
            <Route path="user/detalji-naloga" element={<AccountInfo/>}/>
            <Route path="user/upolad-photo" element={<ProfileImageUpload/>}/>
            <Route path="user/new-transaction" element={<NewTransaction focusedAcc={focusedAcc}/>}/>
            <Route path="unauthorised_access" element={ <UnauthorisedAccessPage /> } />
          </Route>
          <Route path="/" element={<NavBar login={0}/>} >
            <Route path="user/login" element={<LogInPageUser handleLogInStatus={handleLogInStatus}/>}/>
            <Route path="user/register" element={<RegisterPageUser/>} />
            <Route path="user/logout" element={<UserLogout handleLogInStatus={handleLogInStatus}/>} />
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
