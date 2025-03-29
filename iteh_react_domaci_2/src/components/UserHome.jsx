import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Racuni from './Racuni';

const UserHome = () => {
    const navigate = useNavigate();

    useEffect( () => {
        let user = window.sessionStorage.getItem("user_auth_token");
        let admin = window.sessionStorage.getItem("admin_auth_token");

        if(admin != null)
          navigate("/admin/home");

        if(user == null)
            navigate("/user/login");
    }, [navigate]);

  return (
      <>
        <Racuni/>
      </>
  )
}

export default UserHome
