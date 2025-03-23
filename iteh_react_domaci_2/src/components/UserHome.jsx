import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const UserHome = () => {
    const navigate = useNavigate();

    useEffect( () => {
        let user = window.sessionStorage.getItem("user_auth_token");
        let admin = window.sessionStorage.getItem("admin_auth_token");

        if(user == null)
            navigate("/user/login");
        else if(admin != null)
            navigate("/admin/home");
        
    }, [navigate]);

  return (
    <div>
      <h1>Dobrodosli, korisnice!</h1>
      <Link to="/user/logout">Odjavite se</Link>
    </div>
  )
}

export default UserHome
