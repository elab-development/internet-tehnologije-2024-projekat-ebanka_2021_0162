import React, {useEffect} from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogInPageAdmin = () => {
    const navigate = useNavigate();

    // Ukoliko je korisnik ulogovan kao regularan => automatsko preusmeravanje
    useEffect( () => {
        let user = window.sessionStorage.getItem("user_auth_token");
        let admin = window.sessionStorage.getItem("admin_auth_token");

        if(admin != null)
            navigate("/admin/home");
        else if(user != null)
            navigate('/user/home');
        
    }, [navigate]);

    const [adminData, setAdminData] = useState({
        email: "",
        password: "",    
    });

    function handleLogin(e) {
        e.preventDefault();

        axios.post("http://127.0.0.1:8000/api/admin/login", adminData)
        .then( (res) => {
            if(res.data.access_token) {
                console.log("success");
                console.log(res.data);
                window.sessionStorage.setItem("admin_auth_token", res.data.access_token);
                navigate('/admin/home');
            }
        })
        .catch( (e) => {
            alert("Neispravna email adresa i/ili lozinka!");
            console.log(e);
        });      
    }

    function handleInput(e) {
        let newAdminData = adminData;
        newAdminData[e.target.name] = e.target.value;
        setAdminData(newAdminData);
    }

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{ borderRadius: "1rem" }}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form"
                className="img-fluid"
                style={{ borderRadius: "1rem 0 0 1rem" }}
              />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={handleLogin}>
                  <h5
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: 1 }}
                  >
                    Dobrodošli na prijavu admina
                  </h5>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input onInput={handleInput}
                      type="email"
                      name="email"
                      id="formEmail"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="formEmail">
                      Email adresa
                    </label>
                  </div>
                  <div data-mdb-input-init="" className="form-outline mb-4">
                    <input onInput={handleInput}
                      name="password"
                      type="password"
                      id="formPassword"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="formPassword">
                      Lozinka
                    </label>
                  </div>
                  <div className="pt-1 mb-4">
                    <button
                      data-mdb-button-init=""
                      data-mdb-ripple-init=""
                      className="btn btn-dark btn-lg btn-block"
                      type="submit"
                    >
                      Prijava
                    </button>
                  </div><br/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}

export default LogInPageAdmin
