import React from 'react'
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ImSwitch} from 'react-icons/im';
import {MdPeopleAlt} from 'react-icons/md';


const NavBar = ({login}) => {
  return (
    <div>
    <nav className="navbar navbar-expand-xl navbar-light bg-light" >
  <div className="container-fluid" >
    <a className="navbar-brand" href="/">
      E-banka
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTogglerDemo2"
      aria-controls="navbarTogglerDemo2"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse show" id="navbarTogglerDemo2">
      <ul className="navbar-nav me-auto mb-2 mb-xl-0">
        <li className="nav-item">
            {window.sessionStorage.getItem("user_auth_token")==null ? 
            (<a className="nav-link" href="/user/login">Login</a>) : 
            (<a className="nav-link" href="/user/logout"><ImSwitch/>Logout</a>)}
        </li>
        {login===1 ? (<></>) : (<li className="nav-item">
          <a
            className="nav-link"
            href="/kursna-lista"
          >
            Kurnsa lista
          </a>
        </li>)}
        {login===1 ? (<li className="nav-item">
          <Link to="user/home" className="nav-link" >
          Računi
          </Link>
        </li>) : (<></> )}
        {login===1 ? (<li className="nav-item">
          <Link to="user/menjacnica" className="nav-link" >
          Menjacnica
          </Link>
        </li>) : (<></> )}
        {login===1 ? (<li className="nav-item">
          <Link to="user/detalji-naloga" className="nav-link" >
          <MdPeopleAlt/>
          </Link>
        </li>) : (<></> )}
      </ul>
    </div>
  </div>
</nav>
<Outlet/>
</div>
  )
}

export default NavBar
