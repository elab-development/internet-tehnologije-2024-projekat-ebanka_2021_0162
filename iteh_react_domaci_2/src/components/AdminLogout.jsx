import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
    const navigate = useNavigate();

    useEffect( () => {

        let admin = window.sessionStorage.getItem("admin_auth_token");

        if(admin != null) {
            window.sessionStorage.removeItem("admin_auth_token");
            navigate("/admin/login");
        } else 
            navigate("/admin/login");
    }, [navigate]);

  return null;
}

export default AdminLogout
