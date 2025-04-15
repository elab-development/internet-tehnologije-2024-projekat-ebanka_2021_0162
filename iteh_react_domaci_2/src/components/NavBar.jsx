import {React} from 'react'
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ImSwitch} from 'react-icons/im';
import {MdPeopleAlt} from 'react-icons/md';
import "../css/Navbar.css";

const NavBar = ({login}) => {

  return (
    <>
      <div className={`${login===1 ? "container-nav-logged-in" : "container-nav-logged-out"}`} >

        <div className={`${login === 1 ? "container-first-group-logged-in" : "container-first-group-logged-out"}`}>
            
            <div className="app-logo">
              <a className="navbar-brand" href="/">
                E-Banka
              </a>
            </div>

            <div className={`${login === 1 ? "nav-items-logged-in" : "nav-items-logged-out"}`}>
              
                { login !== 1 ? 
                (<div className="nav-item-log-in"><a className="nav-link" href="/user/login">Login</a></div>) : 
                (<></>)}
            
            {login===1 ? (<></>) : (<div className="nav-item-kursna-lista ">
              <a
                className="nav-link"
                href="/kursna-lista"
              >
                Kursna lista
              </a>
            </div>)}

            </div>

        </div>

        <div className={`${login === 1 ? "container-second-group-logged-in" : "container-second-group-logged-out"}`}>
          <div className="second-group-first-subgroup">
                {login===1 ? (<div className="nav-item">
                  <Link to="user/home" className="nav-link" >
                  Računi
                  </Link>
                </div>) : (<></> )}

                {login===1 ? (<div className="nav-item">
                  <Link to="user/new-transaction" className="nav-link" >

                  <div className="nav-item">
                  <label type="button" className="nav-item" data-bs-toggle="dropdown" aria-expanded="false">
                    Plaćanja
                  </label>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="user/new-transaction/interna-transakcija">Interno placanje</Link></li>
                    <li><Link className="dropdown-item" to="user/new-transaction/eksterna-transakcija">Eksterno plaćanje</Link></li>
                  </ul>
                  </div>

                  </Link>

                </div>) : (<></> )}

                {login===1 ? (<div className="nav-item">
                  <Link to="user/menjacnica" className="nav-link" >
                  Menjacnica
                  </Link>

                </div>) : (<></> )}
            </div>

              <div className="second-group-second-subgroup">
                  {login===1 ? (<div className="nav-item">
                    <Link to="user/detalji-naloga" className="nav-link" >
                    <MdPeopleAlt style={{width: '1.4em', height: '1.4em'}}/>
                    </Link>
                  </div>) : (<></> )}
                  <div className="nav-item">
                    {window.sessionStorage.getItem("user_auth_token")==null ? 
                    (<></>) : 
                    (<a className="nav-link" href="/user/logout"><ImSwitch style={{ width: '1.4em', height: '1.4em'}}/></a>)}
                  </div>
              </div>
        </div>
      
      </div>

      <Outlet/>
    </>)
}

export default NavBar
