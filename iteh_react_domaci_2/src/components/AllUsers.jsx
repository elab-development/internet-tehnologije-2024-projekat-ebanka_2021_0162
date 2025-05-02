import React from 'react';
import '../css/AllUsersTabela.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import OneUser from './OneUser';


const AllUsers = () => {

    const[korisnici, setKorisnici]=useState([]);
    const[oneKorisnik, setOneKorisnik]=useState();
    const[clicked, setClicked]=useState(false);

    useEffect(()=>{

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
          })
          .catch((error) => {
            console.log(error);
          });
          
    },[]);

    const handleUserDetails=async(user_id)=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/admin/korisnik/${user_id}`,
            headers: { 
              'Authorization': 'Bearer ' + window.sessionStorage.getItem('admin_auth_token'), 
            },
        };
          
          axios.request(config)
          .then((response) => {
            setOneKorisnik(response.data.users);
            setClicked(true);
          })
          .catch((error) => {
            console.log(error);
          });
          
    }

    const closeDetails = () => {
      setClicked(false);
      setOneKorisnik(null);
      document.querySelector("body").classList.remove("zakljucan-background");
    }

  return (
    <>
    <div className="tabela-kontejner">
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
  {clicked && <OneUser details={oneKorisnik} closeDetails={closeDetails}/>}
</>
  )
}

export default AllUsers
