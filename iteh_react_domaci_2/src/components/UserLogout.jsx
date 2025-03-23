import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect( () => {
        let user = window.sessionStorage.getItem("user_auth_token");

        if(user != null) {
            window.sessionStorage.removeItem("user_auth_token");
            navigate("/user/login");
        } else 
            navigate("/user/login");

    }, [navigate]);

  return (
    <div>
    </div>
  )
}

export default UserLogout
