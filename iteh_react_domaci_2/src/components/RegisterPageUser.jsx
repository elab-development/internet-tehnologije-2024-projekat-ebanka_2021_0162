import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/RegisterPageUser.css';
import { useState } from 'react';
import axios from 'axios';

const RegisterPageUser = () => {

    const [userData, setUserData] = useState({
        ime: "",
        prezime: "",
        email: "",
        password: "",
        adresa: "",
        grad: "",
        datum_rođenja: "",
        maticni_broj: "",
        broj_licne_karte: "",
    });

    const navigate = useNavigate();
    
    function handleReset() {
        let input_elems = document.getElementsByTagName("input");

        for(let i = 0; i < input_elems.length; i++) 
            input_elems[i].value = "";
    }

    function handleInput(e) {
        let newUserData = userData;
       
        // Promena formata datuma da bi mogao da se upise u mysql bazu preko phpmyadmina
        if(e.target.name == "datum_rođenja") 
            newUserData[e.target.name] = e.target.value.split('-')[2] + e.target.value.split('-')[1] + e.target.value.split('-')[0]; 

        newUserData[e.target.name] = e.target.value;
        
        setUserData(newUserData);
    }
    
    function handleSignUp(e) {
        e.preventDefault();

        axios.post("http://127.0.0.1:8000/api/registracija", userData)
        .then( (res) => {
            console.log("success");
            console.log(res.data);
            navigate('/login');
        })
        .catch( (e) => {
            console.log(e);
        });
    }

  return (
    <section className="h-100 bg-dark">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <div className="card card-registration my-4">
          <div className="row g-0">
            <div className="col-xl-6 d-none d-xl-block">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                alt="Sample photo"
                className="img-fluid"
                style={{
                  borderTopLeftRadius: ".25rem",
                  borderBottomLeftRadius: ".25rem"
                }}
              />
            </div>
            <div className="col-xl-6">
              <div className="card-body p-md-5 text-black">
                <h3 className="mb-5 text-uppercase">
                  Registrujte svoj nalog
                </h3>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init="" className="form-outline">
                      <input
                        onInput={handleInput}
                        type="text"
                        name="ime"
                        id="formName"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="formName">
                        Ime
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init="" className="form-outline">
                      <input
                        onInput={handleInput}
                        type="text"
                        name="prezime"
                        id="formSurname"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="formSurname">
                        Prezime
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init="" className="form-outline">
                      <input
                        onInput={handleInput}
                        type="email"
                        name="email"
                        id="formEmail"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="formEmail">
                        Email adresa
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div data-mdb-input-init="" className="form-outline">
                      <input
                        onInput={handleInput}
                        type="password"
                        name="password"
                        id="formPass"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="formPass">
                        Lozinka
                      </label>
                    </div>
                  </div>
                </div>

                <div data-mdb-input-init="" className="form-outline mb-4">
                  <input
                    onInput={handleInput}
                    type="text"
                    name="adresa"
                    id="formAddress"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="formAddress">
                    Adresa
                  </label>
                </div>
                
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <input
                    onInput={handleInput}
                    type="text"
                    name="grad"
                    id="formCity"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="formCity">
                    Grad
                  </label>
                </div>
                
            
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <input
                    onInput={handleInput}
                    type="date"
                    name="datum_rođenja"
                    id="formDob"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="formDob">
                    Datum Rođenja
                  </label>
                </div>
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <input
                    onInput={handleInput}
                    type="text"
                    name="maticni_broj"
                    id="formJMBG"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="formJMBG">
                    Matični broj
                  </label>
                </div>
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <input
                    onInput={handleInput}
                    type="text"
                    name="broj_licne_karte"
                    id="formID"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="formID">
                    Broj Lične Karte
                  </label>
                </div>
                
                <div className="d-flex justify-content-end pt-3">
                  <button
                    onClick={handleReset}
                    type="button"
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    className="btn btn-light btn-lg"
                  >
                    Resetuj sva polja
                  </button>
                  <button
                    onClick={handleSignUp}
                    type="submit"
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    className="btn btn-warning btn-lg ms-2"
                  >
                    Potvrdi registraciju
                  </button>
                </div>
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

export default RegisterPageUser
