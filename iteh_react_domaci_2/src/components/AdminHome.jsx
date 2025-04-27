import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SlPeople } from 'react-icons/sl';
import '../css/AdminHone.css';

const AdminHome = () => {
    const navigate = useNavigate();

    useEffect( () => {
        let user = window.sessionStorage.getItem("user_auth_token");
        let admin = window.sessionStorage.getItem("admin_auth_token");

        if(admin == null)
            navigate("/admin/login");
        else if(user != null)
            navigate("/user/home");
        
    }, [navigate]);

    return (
        <div className="telo-admina">
        <div className="korisnici-container"> 
            <div className='first-column'>
                <p className='first-column-text'>KORISNICI</p>
                <SlPeople style={{width:'5em',height:'5em', color:'blue'}}/>
            </div>
            <div className='second-column'>
            <Link to="/admin/svi-korisnici" ><button className="btn-link">Prikaz svih korisnika</button></Link>
            <Link to="/admin/novi-korisnik" ><button className="btn-link">Kreiranje novog korisnika</button></Link>
            </div>

            
        </div>
        
        <Link to="/admin/logout">Odjavite se</Link>
    </div>
    )
}

export default AdminHome
