import React, { useState, useEffect } from 'react';
import '../css/OneUser.css';
import { Link, useNavigate } from 'react-router-dom';
import PopUp from './PopUp.jsx';
import axios from 'axios';
import CreateNewUser from './CreateNewUser.jsx';

const OneUser = ({details, closeDetails}) => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [isEverythingDone, setIsEverythingDone] = useState(false);
  const [toModifyUser, setToModifyUser] = useState(false);
  const navigate = useNavigate();

  const closeMessageBox = () => {
    setIsEverythingDone(false);
    window.location.reload();
  }

  function handleUserDelete() {
    if (!window.confirm("Da li ste sigurni?")) return;
  
    let config_get_all_accounts = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://127.0.0.1:8000/api/admin/bankovni-racuni-korisnika/${details.id}`,
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('admin_auth_token')
      },
    };
  
    axios.request(config_get_all_accounts)
      .then((res) => {
        const racuni = res.data.racuni;
        setAllAccounts(racuni);
  
        const accountIds = racuni.map(acc => acc.id);
  
        let config_delete_accounts_transactions = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:8000/api/admin/obrisi-racune-i-transakcije',
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('admin_auth_token')
          },
          data: { acc_id: accountIds }
        };
  
        return axios.request(config_delete_accounts_transactions);
      })
      .then(() => {
        let config_delete_user = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: `http://127.0.0.1:8000/api/admin/korisnici/${details.id}`,
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('admin_auth_token')
          },
        };
  
        return axios.request(config_delete_user);
      })
      .then(() => {
        console.log("Korisnik i svi njegovi racuni i transakcije su obrisani.");
        setIsEverythingDone(true);
      })
      .catch((e) => {
        console.error("Desila se greska:", e);
      });
  }

  function handleUserModify() {
    navigate('/admin/kreiraj-korisnika', { state: {toModify: true, details}});
  }

  const handleUserBankAccounts = () => {
    navigate('/admin/bankovni-racuni-korisnika', { state: details });
  };
  
  return (
    <div className='oneUser-container'> 
      <h3 className='naslov'>Detalji izabranog korisnika</h3>
      <br/>
      <p className="paragraf"><span className="span1">ID: </span><span className="span2">{details.id}</span></p>
      <p className="paragraf"><span className="span1">Ime: </span><span className="span2">{details.ime}</span></p>
      <p className="paragraf"><span className="span1">Prezime: </span><span className="span2">{details.prezime}</span></p>
      <p className="paragraf"><span className="span1">Email: </span><span className="span2">{details.email}</span></p>
      <p className="paragraf"><span className="span1">Datum rodjenja: </span><span className="span2">{details.datum_rođenja}</span></p>
      <p className="paragraf"><span className="span1">Maticni broj: </span><span className="span2">{details.maticni_broj}</span></p>
      <p className="paragraf"><span className="span1">Broj licne karte: </span><span className="span2">{details.broj_licne_karte}</span></p>
      <p className="paragraf"><span className="span1">Adresa: </span><span className="span2">{details.adresa}</span></p>
      <p className="paragraf"><span className="span1">Grad: </span><span className="span2">{details.grad}</span></p>
      <p className="paragraf"><span className="span1">Drzava: </span><span className="span2">{details.drzava}</span></p>
      <p className="paragraf"><span className="span1">Broj telefona: </span><span className="span2">{details.broj_telefona}</span></p>
      
      <br/>
      <div className='second-user-container'>
      <button className='closed-btn'  onClick={closeDetails}>Zatvori</button>
      <button className='closed-btn' onClick={handleUserModify}>Izmeni</button>
      <button className='closed-btn' onClick={handleUserDelete}>Obrisi</button>
      </div>
      <button className='details-btn' onClick={()=>{handleUserBankAccounts()}}>Prikaz svih racuna korisnika</button>

      {isEverythingDone && <PopUp closeMessageBox={closeMessageBox} messageText={"Korisnik je uspešno obrisan."} />}

      {toModifyUser && <CreateNewUser details={details} />}
    </div>
  )
}

export default OneUser
