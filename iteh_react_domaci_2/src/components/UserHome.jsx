import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Racuni from './Racuni';
import axios from 'axios';
import "../css/HomePageData.css";
import { PiVaultBold } from "react-icons/pi";

const UserHome = () => {
    const navigate = useNavigate();

    const [focusedAcc, setFocusedAcc] = useState(null);
    let [transactions, setTransactions] = useState([]);

    const [isFocusedTab_1, setIsFocusedTab_1] = useState(false);
    const [isFocusedTab_2, setIsFocusedTab_2] = useState(true);
    const [isFocusedTab_3, setIsFocusedTab_3] = useState(false);

    function handleTab_1() {
      setIsFocusedTab_1(true);
      setIsFocusedTab_2(false);
      setIsFocusedTab_3(false);
    }

    function handleTab_2() {
      setIsFocusedTab_1(false);
      setIsFocusedTab_2(true);
      setIsFocusedTab_3(false);
    }
    
    function handleTab_3() {
      setIsFocusedTab_1(false);
      setIsFocusedTab_2(false);
      setIsFocusedTab_3(true);
    }

    const handleAccountFocus = (acc) => {
      setFocusedAcc(acc);
      console.log(acc);
      prepareTransactions(acc);
    }

    function prepareTransactions(acc) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/api/korisnik/izvrsene-transakcije/${acc.id}`,
        headers: { 
          'Authorization': 'Bearer ' + window.sessionStorage.getItem("user_auth_token")
        }
      };
      
      axios.request(config)
      .then((response) => {
        setTransactions(response.data.transakcije);
      })
      .catch((error) => {
        console.log(error);
      });

    }    

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
        <Racuni onAccountFocus={handleAccountFocus} />

        <div className="main-container">
          <div className="tabs-container">
            <div onClick={handleTab_1} className={`${isFocusedTab_1 ? "focused-tab" : ""} bank-account tab`}>Detalji Računa</div>
            <div onClick={handleTab_2} className={`${isFocusedTab_2 ? "focused-tab" : ""} transactions tab`}>Transakcije</div>
            <div onClick={handleTab_3} className={`${isFocusedTab_3 ? "focused-tab" : ""} transactions-export tab`}>Izvodi Transakcija</div>
          </div>

          <div className="data-container"> 

            {isFocusedTab_2 && (<><div className="list-of-transactions-container">
              <div className="lista-trans-icon-headline">
                <div><PiVaultBold style={{fontSize:'1.8em', marginBottom:'3px', color:'darkBlue'}} /></div>
                <div><h2>Lista Transakcija Za {focusedAcc == null ? <></> : focusedAcc.tip} Račun:</h2></div>
              </div>
              <div className="lista-trans-br-racuna">{focusedAcc == null ? <>/</>:focusedAcc.detalji.broj_racuna}</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="transactions-tbl-heading">ID Transakcije</th>
                  <th className="transactions-tbl-heading">Datum</th>
                  <th className="transactions-tbl-heading">Vreme</th>
                  <th className="transactions-tbl-heading">Iznos</th>
                  <th className="transactions-tbl-heading">Opis Transakcije</th>
                  <th className="transactions-tbl-heading">Broj Računa Primaoca</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? <tr style={{borderBottom : 'none'}}><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>: <></>}
            {transactions == null ? <></> : transactions.map( (transakcija) => {
             return (
                <tr className="data-row" key={transakcija.id}>
                  <td>{transakcija.id}</td>
                  <td>{transakcija.datum}</td>
                  <td>{transakcija.vreme}</td>
                  <td>{transakcija.iznos} <span>{focusedAcc.detalji.valuta == null ? "RSD" : focusedAcc.detalji.valuta}</span></td>
                  <td>{transakcija.opis_transakcije}</td>
                  <td>{transakcija.broj_racuna_primaoca}</td>
                </tr>
             );
            })}
            </tbody>
          </table>
          </>
            )}
        </div>
      </div> 
      </>
  )
}

export default UserHome
