import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

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
        <div>
            <h1>Dobrodosao, admine!</h1>
            <Link to="/admin/logout">Odjavite se</Link>
        </div>
    )
}

export default AdminHome
