import React from 'react';
import '../css/Tabela.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import OneUser from './OneUser';
import { PulseLoader } from 'react-spinners';
import OneBank from './OneBank';


const Table = ({tipTabele}) => {

    const[korisnici, setKorisnici]=useState([]);
    const[banke, setBanke]=useState([]);
    const[oneKorisnik, setOneKorisnik]=useState();
    const[oneBank, setOneBank]=useState();
    const[clickedUser, setClickedUser]=useState(false);
    const[clickedBank, setClickedBank]=useState(false);
    const[loading, setLoading]=useState(true);

    useEffect(()=>{

      if(tipTabele==='korisnici'){
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:8000/api/admin/korisnici',
          headers: { 
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('admin_auth_token'),   
          },
        };
        
        axios.request(config)
        .then((response) => {
          setKorisnici(response.data.users);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      }

      if(tipTabele==='banke'){
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:8000/api/admin/banke',
          headers: { 
            'Authorization': 'Bearer '+window.sessionStorage.getItem('admin_auth_token'), 
            
          },
        };
        
        axios.request(config)
        .then((response) => {
          setBanke(response.data.banke);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      }

          
    },[]);

    const handleUserDetails=async(user_id)=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/admin/korisnici/${user_id}`,
            headers: { 
              'Authorization': 'Bearer ' + window.sessionStorage.getItem('admin_auth_token'), 
            },
        };
          
          axios.request(config)
          .then((response) => {
            setOneKorisnik(response.data.users);
            setClickedUser(true);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const handleBankDetails=async(banka_id)=>{
      let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `http://127.0.0.1:8000/api/admin/banke/${banka_id}`,
          headers: { 
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('admin_auth_token'), 
          },
      };
        
        axios.request(config)
        .then((response) => {
          console.log(response.data.banke);
          setOneBank(response.data.banke);
          setClickedBank(true);
        })
        .catch((error) => {
          console.log(error);
        });
        
  }

    

    const closeDetails = () => {
      setClickedUser(false);
      setClickedBank(false);
      setOneKorisnik(null);
      document.querySelector("body").classList.remove("zakljucan-background");
    }

  return (
    <>
    {loading===true ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", marginTop: '-5em' }}>
      <PulseLoader
        color="#9A616D"     
        size={35}           
        margin={8}          
        speedMultiplier={0.5} 
      />
    </div> : <>
            {tipTabele==='korisnici' ? <>
            
              <div className="tabela-kontejner-user">
    <table className="user-tabela">
      <thead>
        <tr>
          <th className='kolona'>ID</th>
          <th className='kolona'>Ime</th>
          <th className='kolona'>Prezime</th>
          <th className='kolona'>Datum rodjenja</th>
          <th className='kolona'>Email</th>
          <th className='kolona'>Maticni broj</th>
          <th className='kolona'>Broj licne karte</th>
          <th className='kolona'>Adresa</th>
          <th className='kolona'>Grad</th>
          <th className='kolona'>Drzava</th>
          <th className='kolona'>Broj telefona</th>
          
        </tr>
      </thead>
      <tbody>
        {korisnici.map((user)=>{
            return <tr className='red' onClick={()=>{handleUserDetails(user.id)}} key={user.id}>
                <td className='red'>{user.id}</td>
                <td className='red'>{user.ime}</td>
                <td className='red'>{user.prezime}</td>
                <td className='red'>{user.datum_rođenja}</td>
                <td className='red'>{user.email}</td>
                <td className='red'>{user.maticni_broj}</td>
                <td className='red'>{user.broj_licne_karte}</td>
                <td className='red'>{user.adresa}</td>
                <td className='red'>{user.grad}</td>
                <td className='red'>{user.drzava}</td>
                <td className='red'>{user.broj_telefona}</td>
                
            </tr>
        })}
               
      </tbody>
    </table>
  </div>
  
 </> : <>
 <div className="tabela-kontejner-banka">
    <table className="user-tabela">
      <thead>
        <tr>
          <th className='kolona'>ID</th>
          <th className='kolona'>Naziv</th>
          <th className='kolona'>Grad</th>
          <th className='kolona'>Broj dozvole</th>
        </tr>
      </thead>
      <tbody>
        {banke.map((banka)=>{
            return <tr className='red' onClick={()=>{handleBankDetails(banka.id)}} key={banka.id}>
                <td className='red'>{banka.id}</td>
                <td className='red'>{banka.naziv}</td>
                <td className='red'>{banka.grad}</td>
                <td className='red'>{banka.broj_dozvole}</td>
            </tr>
        })}
               
      </tbody>
    </table>
  </div>
 </>}
    </>}
    
  {(clickedBank && tipTabele==='banke') && <OneBank details={oneBank} closeDetails={closeDetails}/>}
  {(clickedUser && tipTabele==='korisnici') && <OneUser details={oneKorisnik} closeDetails={closeDetails}/>}
  

</>
  )
}

export default Table
