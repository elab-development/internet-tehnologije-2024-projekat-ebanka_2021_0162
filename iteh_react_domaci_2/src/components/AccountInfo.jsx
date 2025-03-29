import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/AccountInfo.css';
import {Link} from 'react-router-dom';
import {BsPencilFill} from 'react-icons/bs';
import ProfileImageUpload from './ProfileImageUpload';

const AccountInfo = () => {
    const [info,setInfo]=useState();

    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/korisnik/informacije-o-nalogu',
            headers: { 
              'Authorization': 'Bearer '+window.sessionStorage.getItem('user_auth_token'), 
            },
            
          };
          
          axios.request(config)
          .then((response) => {
            setInfo(response.data.users);
          })
          .catch((error) => {
            console.log(error);
          });
    },[]);

    let datum = info==null ? <></> : (info.datum_rođenja.split('-')[2]+"/"+info.datum_rođenja.split('-')[1]+"/"+info.datum_rođenja.split('-')[0]) ;


  return (
    <div className="account-info-body">
      
      <div className="container-image-edit">

        <div className="container-image">
          <ProfileImageUpload />
        </div>
        <div className="container-edit">
          <Link to="user/izmena-naloga"><button type="button" className="btn-edit">Izmena podataka   <BsPencilFill style={{marginLeft:'.4em'}}/></button></Link>
        </div>
      </div>

      
    <div className="container-info">
      
      <div> {info==null ? <></> : (<>Ime i prezime:<p className="user-data">{info.ime} {info.prezime}</p></>)}</div>
      <div >{info==null ? <></> : (<>Datum rođenja:<p className="user-data">{datum}</p></>)}</div>
      <div >{info==null ? <></> : (<>Jedinstveni maticni broj:<p className="user-data">{info.maticni_broj}</p></>)}</div>
      <div >{info==null ? <></> : (<>E-mail:<p className="user-data">{info.email}</p></>)}</div>
      <div >{info==null ? <></> : (<>Broj telefona:<p className="user-data">{info.broj_telefona}</p ></>)}</div> 
      <div >{info==null ? <></> : (<>Broj licne karte:<p className="user-data">{info.broj_licne_karte}</p></>)}</div>
    </div>
    
    <div className="container-info-2">
     
      <div>{info==null ? <></> : (<>Adresa:<p className="user-data">{info.adresa}</p></>)}</div>
      <div>{info==null ? <></> : (<>Grad:<p className="user-data">{info.grad}</p></>)}</div>
      <div>{info==null ? <></> : (<>Drzava:<p className="user-data">{info.drzava}</p></>)}</div>
    </div>
    
    </div>
  )
}

export default AccountInfo
